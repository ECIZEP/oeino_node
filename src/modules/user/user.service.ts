import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        
    }

    async findOneById({id, wechat, weibo, googleId, githubId}: any): Promise<User> {
        let queryObj = {
            id,
            wechat,
            weibo,
            googleId,
            githubId
        };
        !!id ? null : delete queryObj.id;
        !!wechat ? null : delete queryObj.wechat;
        !!weibo ? null : delete queryObj.weibo;
        !!googleId ? null : delete queryObj.googleId;
        !!githubId ? null : delete queryObj.githubId;
        return await this.userRepository.findOne({
            where: queryObj
        });
    }

    async add(user: User):Promise<User> {
        return await this.userRepository.save(user);
    }

    updateUser(id: string, updateFields: any):Promise<UpdateResult> {
        return this.userRepository.update(id, updateFields);
    }
}