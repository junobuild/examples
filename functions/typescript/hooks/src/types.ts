import {z} from 'zod/v4';
import {PrincipalTextSchema} from "@dfinity/zod-schemas";

export const PersonDataSchema = z.object({
    yolo: z.boolean(),
    hello: z.string(),
    principal: PrincipalTextSchema,
    value: z.bigint(),
});

export type PersonData = z.infer<typeof PersonDataSchema>;