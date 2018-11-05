import { Resolver, Query, Args, ResolveProperty, Parent, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { UseGuards } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query('user')
    @UseGuards(UserGuard)
    user(@Context() ctx) {
        const { req } = ctx;
        /* throw new ApolloError('hhaha', 'MY_ERROR', {
            "a": "sdfsd"
        }); */
        return req.session.user;
    }
}