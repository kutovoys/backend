import { Injectable } from '@nestjs/common';
import { UniversalConverter } from '@common/converter/universalConverter';
import { Users } from '@prisma/client';
import { UserEntity } from './entities/users.entity';

const modelToEntity = (model: Users): UserEntity => {
    return new UserEntity(model);
};

const entityToModel = (entity: UserEntity): UserEntity => {
    return {
        uuid: entity.uuid,
        subUuid: entity.subUuid,
        username: entity.username,
        status: entity.status,
        usedTrafficBytes: entity.usedTrafficBytes,
        trafficLimitBytes: entity.trafficLimitBytes,
        trafficLimitStrategy: entity.trafficLimitStrategy,
        subLastUserAgent: entity.subLastUserAgent,
        subLastIp: entity.subLastIp,

        onlineAt: entity.onlineAt,
        expireAt: entity.expireAt,
        subRevokedAt: entity.subRevokedAt,

        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
    };
};
@Injectable()
export class UserConverter extends UniversalConverter<UserEntity, Users> {
    constructor() {
        super(modelToEntity, entityToModel);
    }
}
