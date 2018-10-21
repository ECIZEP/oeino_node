import { Resolver, Query, Args, ResolveProperty, Parent, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('UserResponse')
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query('user')
    @UseGuards(UserGuard)
    user(@Context() ctx) {
        // console.log('dsf', ctx);
        return {
            user: {
                nickname: 'sdf',
                baseResponse: {
                    statusCode: 0
                }
            }
        }
    }
}