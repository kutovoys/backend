import { z } from 'zod';
import { REST_API } from '../../api';
import { NodesSchema } from '../../models';

export namespace DisableNodeCommand {
    export const url = REST_API.NODES.DISABLE;
    export const TSQ_url = url(':uuid');

    export const RequestSchema = z.object({
        uuid: z.string().uuid(),
    });

    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = z.object({
        response: NodesSchema,
    });

    export type Response = z.infer<typeof ResponseSchema>;
}
