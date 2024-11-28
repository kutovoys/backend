import { z } from 'zod';
import { REST_API } from '../../api';
import { ALPN } from '../../constants/hosts/alpn';
import { FINGERPRINTS } from '../../constants/hosts/fingerprints';
import { HostsSchema } from '../../models';

export namespace UpdateHostCommand {
    export const url = REST_API.HOSTS.UPDATE;

    export const RequestSchema = HostsSchema.pick({
        uuid: true,
    }).extend({
        inboundUuid: z
            .string({
                invalid_type_error: 'Inbound UUID must be a string',
            })
            .uuid('Inbound UUID must be a valid UUID')
            .optional(),
        remark: z
            .string({
                invalid_type_error: 'Remark must be a string',
            })
            .max(40, {
                message: 'Remark must be less than 40 characters',
            })
            .optional(),
        address: z
            .string({
                invalid_type_error: 'Address must be a string',
            })
            .optional(),
        port: z
            .number({
                invalid_type_error: 'Port must be an integer',
            })
            .int()
            .optional(),
        path: z.string().optional(),
        sni: z.string().optional(),
        host: z.string().optional(),
        alpn: z.nativeEnum(ALPN).optional(),
        fingerprint: z.nativeEnum(FINGERPRINTS).optional(),
        allowInsecure: z.boolean().optional(),
        isDisabled: z.boolean().optional(),
    });
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = z.object({
        response: HostsSchema,
    });

    export type Response = z.infer<typeof ResponseSchema>;
}
