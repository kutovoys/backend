import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// { log: ['query'] }
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super();
    }
    async onModuleInit() {
        await this.$connect();
    }
}
