import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '@common/config/jwt/jwt.config';
import { JwtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { COMMANDS } from './commands';

@Module({
    imports: [CqrsModule, JwtModule.registerAsync(getJWTConfig())],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService, ...COMMANDS],
})
export class AuthModule {}
