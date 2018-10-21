import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { OAuth2Controler } from './oAuth2.controller';
import { User } from '../../entity/user.entity';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UserModule],
    controllers: [OAuth2Controler],
})
export class OAuth2Module {}