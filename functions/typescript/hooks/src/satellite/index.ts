import {
  type AssertSetDoc,
  defineAssert,
  defineHook,
  type OnSetDoc,
} from "@junobuild/functions";
import { PersonData, PersonDataSchema } from "../types";
import {
  decodeDocData,
  encodeDocData,
  setDocStore,
} from "@junobuild/functions/sdk";
import { Principal } from "@dfinity/principal";

export const assertSetDoc = defineAssert<AssertSetDoc>({
  collections: ["demo"],
  assert: (context) => {
    // We validate that the data submitted for create or update matches the expected schema.
    const person = decodeDocData<PersonData>(context.data.data.proposed.data);

    PersonDataSchema.parse(person);
  },
});

export const onSetDoc = defineHook<OnSetDoc>({
  collections: ["demo"],
  run: async (context) => {
    const {
      caller,
      data: {
        key,
        collection,
        data: { after: currentDoc },
      },
    } = context;

    // We decode the new data saved in the Datastore because it holds those as blob.
    const person = decodeDocData<PersonData>(currentDoc.data);

    // Some console.logout for demo purpose
    console.log(
      "[on_set_doc] Caller:",
      Principal.fromUint8Array(caller).toText(),
    );

    console.log("[on_set_doc] Collection:", collection);

    console.log("[on_set_doc] Data:", person.principal, person.value);

    // We update the document's data that was saved in the Datastore with the call from the frontend dapp.
    const { hello, ...rest } = person;

    const updatePerson = {
      ...rest,
      hello: `${hello} checked`,
      yolo: false,
    };

    // We encode the data back to blob.
    const updateData = encodeDocData(updatePerson);

    // We save the document for the same caller as the one who triggered the original on_set_doc, in the same collection with the same key as well.
    setDocStore({
      caller: caller,
      collection,
      key,
      doc: {
        version: currentDoc.version,
        data: updateData,
      },
    });
  },
});
