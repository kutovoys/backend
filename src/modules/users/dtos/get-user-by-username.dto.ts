import { createZodDto } from 'nestjs-zod';

import { GetUserByUsernameCommand } from '@libs/contracts/commands';

export class GetUserByUsernameRequestDto extends createZodDto(
    GetUserByUsernameCommand.RequestSchema,
) {}
export class GetUserByUsernameResponseDto extends createZodDto(
    GetUserByUsernameCommand.ResponseSchema,
) {}
