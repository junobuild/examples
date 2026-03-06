import { defineRun } from "@junobuild/config";
import { AgentError, HttpAgent, Identity } from "@icp-sdk/core/agent";
import {
  IcManagementCanister,
  type IcManagementDid,
} from "@icp-sdk/canisters/ic-management";
import { Principal } from "@icp-sdk/core/principal";
import { readFile } from "node:fs/promises";
import { upgradeModule } from "@junobuild/admin";
import { IDL } from "@icp-sdk/core/candid";
import { AccountIdentifier } from "@icp-sdk/canisters/ledger/icp";
// @ts-expect-error demo purpose only. Loose, pragmatic import.
import { init } from "./node_modules/@icp-sdk/canisters/declarations/ledger-icp/ledger.idl";

// ============================================================
// Configure your canister here
// ============================================================

const CANISTER = {
  canisterId: "2ipq2-uqaaa-aaaar-qailq-cai",
  wasmPath: "./ledger-canister.wasm.gz",
  // Edit your init arguments in "buildInitArgs" function at the end of this script
} as const;

// ============================================================

type CanisterStatus = "not_exists" | "not_installed" | "installed";

type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; err: unknown };

const INSTALL_MODES: {
  install: IcManagementDid.canister_install_mode;
  reinstall: IcManagementDid.canister_install_mode;
  upgrade: IcManagementDid.canister_install_mode;
} = {
  install: { install: null },
  reinstall: { reinstall: null },
  upgrade: {
    upgrade: [
      {
        wasm_memory_persistence: [
          {
            replace: null,
          },
        ],
        skip_pre_upgrade: [false],
      },
    ],
  },
};

export const onRun = defineRun(({ mode }) => ({
  run: async ({ identity, container }) => {
    console.log(
      "************************************************************************************************************",
    );
    console.log(
      `* Running installation in ${mode} with ${identity.getPrincipal().toText()} *`,
    );
    console.log(
      "************************************************************************************************************\n",
    );

    const agent = await HttpAgent.create({
      identity,
      host: container,
      shouldFetchRootKey: mode === "development",
    });

    console.log(`🤔 Checking canister ${CANISTER.canisterId} status...`);

    const checkStatus = await checkCanisterStatus({ agent });

    if (checkStatus.status === "error") {
      console.log(
        `‼️  Cannot assert if the canister ${CANISTER.canisterId} exists or not.`,
      );
      console.log("Maybe it does but, your CLI does not control it yet?");
      throw checkStatus.err;
    }

    const { data: status } = checkStatus;

    if (status === "not_exists") {
      console.log(`🚀 Creating new canister ${Object.keys(status)[0]}...`);

      const createCanisterResult = await createCanister({ agent, identity });

      if (createCanisterResult.status === "error") {
        console.log(
          `‼️  Cannot create a new canister with ID ${CANISTER.canisterId}!`,
        );
        throw createCanisterResult.err;
      }
    }

    let installMode: IcManagementDid.canister_install_mode;
    switch (status) {
      case "not_exists":
      case "not_installed":
        installMode = INSTALL_MODES.install;
        break;
      default:
        installMode = INSTALL_MODES.upgrade;
    }

    console.log(
      `🔧 Starting ${"install" in installMode ? "installation" : "upgrade"}...`,
    );

    await install({ agent, identity, mode: installMode });

    console.log("👍 Done");
  },
}));

const checkCanisterStatus = async ({
  agent,
}: {
  agent: HttpAgent;
}): Promise<Result<CanisterStatus>> => {
  const { canisterStatus } = IcManagementCanister.create({
    agent,
  });

  const { canisterId } = CANISTER;

  try {
    // If it does not throw, the canister exists and the CLI is a controller.
    const { module_hash } = await canisterStatus({
      canisterId: Principal.fromText(canisterId),
    });

    return {
      status: "success",
      data: module_hash[0] !== undefined ? "installed" : "not_installed",
    };
  } catch (err: unknown) {
    if (
      err instanceof AgentError &&
      (err.toString().includes(`Canister ${canisterId} not found`) ||
        err.toString().includes("canister_not_found"))
    ) {
      return { status: "success", data: "not_exists" };
    }

    return { status: "error", err };
  }
};

const createCanister = async ({
  agent,
  identity,
}: {
  agent: HttpAgent;
  identity: Identity;
}): Promise<Result<Principal>> => {
  const { provisionalCreateCanisterWithCycles } = IcManagementCanister.create({
    agent,
  });

  try {
    const { canisterId } = CANISTER;

    const resultId = await provisionalCreateCanisterWithCycles({
      settings: {
        controllers: [identity.getPrincipal().toText()],
      },
      canisterId: Principal.from(canisterId),
    });

    return { status: "success", data: resultId };
  } catch (err: unknown) {
    return { status: "error", err };
  }
};

const install = async ({
  mode,
  identity,
  agent,
}: {
  agent: HttpAgent;
  identity: Identity;
  mode: IcManagementDid.canister_install_mode;
}) => {
  const { wasmPath, canisterId } = CANISTER;

  await upgradeModule({
    actor: { agent, identity },
    mode,
    canisterId: Principal.fromText(canisterId),
    wasmModule: await readFile(wasmPath),
    arg: buildInitArgs({
      identity,
      mode: "upgrade" in mode ? "upgrade" : "install",
    }),
    takeSnapshot: false,
  });
};

// For demo purpose only. Values - notably the identity - used to build the arguments
// make no sense.
const buildInitArgs = ({
  identity,
  mode,
}: {
  identity: Identity;
  mode: "upgrade" | "install";
}): Uint8Array => {
  const minterAccountIdentifier = AccountIdentifier.fromPrincipal({
    principal: identity.getPrincipal(),
  }).toHex();

  const ledgerAccountIdentifier = AccountIdentifier.fromPrincipal({
    principal: identity.getPrincipal(),
  }).toHex();

  const initArgs = {
    send_whitelist: [],
    token_symbol: ["Yolo"],
    transfer_fee: [{ e8s: 10_000n }],
    minting_account: minterAccountIdentifier,
    maximum_number_of_accounts: [],
    accounts_overflow_trim_quantity: [],
    transaction_window: [],
    max_message_size_bytes: [],
    icrc1_minting_account: [],
    archive_options: [],
    initial_values: [[ledgerAccountIdentifier, { e8s: 100_000_000_000n }]],
    token_name: ["Yolo world"],
    feature_flags: [],
  };

  const upgradeArgs: unknown = [];

  return IDL.encode(init({ IDL }), [
    mode === "upgrade" ? { Upgrade: upgradeArgs } : { Init: initArgs },
  ]);
};
