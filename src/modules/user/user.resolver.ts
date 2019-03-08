import { Resolver, Query, Args, ResolveProperty, Parent, Context, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { UseGuards } from '@nestjs/common';
import { filterNullAndUndefined } from '../../util/index';
import { ServerUnavailableError } from '../../util/errors';
import { User } from 'entity/user.entity';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query('user')
    @UseGuards(UserGuard)
    async user(@Context() ctx) {
        const { req } = ctx;
        let user: User = await this.userService.findOneById({
            id: req.session.user.id
        })
        if (!!user.id) {
            return user
        } else {
            return new ServerUnavailableError('can not found user info for current login user')
        }
    }

    @Mutation('updateUser')
    async updateUser(@Context() ctx, @Args() args): Promise<boolean> {
        const { req } = ctx;
        // graphql args is created by Object.create(null), no methods in Object.prototype
        let updateFields:Object = Object.assign({}, args.updateFields);
        updateFields = filterNullAndUndefined(updateFields);
        let result = await this.userService.updateUser(req.session.user.id, updateFields);
        if (result.raw.affectedRows === 1) {
            return true;
        } else {
            throw new ServerUnavailableError('updateUser failed');
        }
    }
}