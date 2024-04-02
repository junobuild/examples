import {EtherscanProvider, formatUnits} from "ethers";

const balance = async () => {
    const input = document.querySelector("#address");
    const address = input?.innerHTML;

    if (address === undefined || address === "") {
        console.error("ETH address not yet loaded.");
        return;
    }

    const provider = new EtherscanProvider('sepolia');

    const balance = await provider.getBalance(address);

    console.log("SepoliaETH balance:", balance);

    const output = document.querySelector("#balance");

    if (!output) {
        return;
    }

    output.innerHTML = formatUnits(balance);
}

export const initETH = () => {
    document
        .querySelector("#check")
        ?.addEventListener("click", balance, { passive: true });
};