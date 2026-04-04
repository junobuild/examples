import { defineHook, type OnSetDoc, SetDoc } from "@junobuild/functions";
import { j } from "@junobuild/schema";
import { httpRequest, HttpRequestArgs } from "@junobuild/functions/ic-cdk";
import { encodeDocData, setDocStore } from "@junobuild/functions/sdk";

// The data of the document we are looking to update in the Satellite's Datastore.
const DogDataSchema = j.strictObject({
  src: j.string().optional(),
});

// We are using the Dog CEO API in this example.
// https://dog.ceo/dog-api/
//
// Its endpoint "random" returns such JSON data:
// {
//     "message": "https://images.dog.ceo/breeds/mountain-swiss/n02107574_1118.jpg",
//     "status": "success"
// }
//
// That's why we declare a struct that matches the structure of the answer.
const DogApiResponseSchema = j.strictObject({
  message: j.url(),
  status: j.string(),
});

export const onSetDoc = defineHook<OnSetDoc>({
  collections: ["dogs"],
  run: async ({
    caller,
    data: {
      collection,
      key,
      data: {
        after: { description, version },
      },
    },
  }) => {
    // 1. Prepare the HTTP GET request
    const url = "https://dog.ceo/api/breeds/image/random";

    const args: HttpRequestArgs = {
      url,
      method: "GET",
      headers: [],
      // Use a single node as we do not require that a trust level for fetching a dog image for demo purposes. 😉
      isReplicated: false,
    };

    // 2. Execute the HTTP request.
    const result = await httpRequest(args);

    // 3. Transform the response to a structured data object.
    const decoder = new TextDecoder();
    const body = decoder.decode(result.body);

    const dogResponse = DogApiResponseSchema.parse(JSON.parse(body));
    // 4. Our goal is to update the document in the Datastore with an update that contains the link to the image fetched from the API we just called.
    const dogData = DogDataSchema.parse({
      src: dogResponse.message,
    });

    // 5. We encode those data back to blob because the Datastore holds data as blob.
    const encodedData = encodeDocData(dogData);

    // 6. Then we construct the parameters required to call the function that save the data in the Datastore.
    const doc: SetDoc = {
      description,
      version,
      data: encodedData,
    };

    // 7. We store the data in the Datastore for the same caller as the one who triggered the original on_set_doc, in the same collection with the same key as well.
    setDocStore({
      caller,
      collection,
      key,
      doc,
    });
  },
});
