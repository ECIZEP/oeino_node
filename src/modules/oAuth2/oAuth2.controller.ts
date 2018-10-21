import { Controller, Get, Query, Session, Response, UseGuards } from '@nestjs/common';
import oAuth2Config from '../../config/oAuth2';
import * as querystring from 'querystring';
import axios from 'axios';
import { UserService } from '../user/user.service';
import { User } from '../../entity/user.entity';
import { OAuth2Guard } from './oAuth2.guard';

@Controller('oauth2')
export class OAuth2Controler {

    constructor(
        private readonly userService: UserService
    ) {}
    
    @UseGuards(OAuth2Guard)
    @Get('user')
    userInfo (@Session() session, @Response() res) {
        if (session && !!session.user) {
            return res.json({
                statusCode: 0,
                message: 'ok',
                data: session.user
            })
        } else {
            return res.json({
                statusCode: 203,
                message: 'not login',
                data: null
            })
        }
    }

    @Get('signin')
    toThridPart(@Query() query, @Session() session, @Response() res) {
        if (session && !!session.user) {
            res.redirect('/oauth2/user');
        }
        if (!!query.platform && !!oAuth2Config[query.platform]) {
            let platformConfig = oAuth2Config[query.platform];
            res.redirect(platformConfig.authorizationUri + '?' + querystring.stringify({
                client_id: platformConfig.clientId,
                scope: platformConfig.scope,
                response_type: 'code',
                redirect_uri: platformConfig.redirectUri,
                state: JSON.stringify({
                    platform: query.platform
                })
            }));
        } else {
            res.json({
                statusCode: 204,
                message: 'Invalide Params: Platform',
                data: null
            })
        }
    }

    @Get('signout')
    signOut(@Session() session,  @Response() res) {
        session.user = null;
        delete session.user;
        res.redirect('/oauth2/user');
    }

    @Get('oauth2callback')
    async codeToToken (@Query() query, @Session() session, @Response() res) {
        if (!!query.code && !!query.state) {
            let state = JSON.parse(query.state),
                accessToken = '';
            let platformConfig = oAuth2Config[state.platform];
            // code取token
            let response = await axios.post(platformConfig.accessTokenUri, querystring.stringify({
                code: query.code,
                client_id: platformConfig.clientId,
                client_secret: platformConfig.clientSecret,
                redirect_uri: platformConfig.redirectUri,
                grant_type: 'authorization_code'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            if (response.status === 200 && !!response.data) {
                let data = response.data;
                if (state.platform === 'github') {
                    data = querystring.parse(data);
                }
                accessToken = data.access_token;
            } else {
                console.log(response.statusText);
            }
            // token拿信息
            response = await axios.get(platformConfig.userInfoUri, {
                params: {
                    access_token: accessToken
                }
            })
            if (response.status === 200 && !!response.data) {
                console.log(response.data);
                let userInstance = new User();
                let newUserId = userInstance.id;
                if (state.platform === 'google') {
                    userInstance.googleId = response.data.id.toString();
                    let result = await this.userService.find({ googleId: userInstance.googleId })
                    if (result.length > 0) {
                        userInstance = result[0];
                    } else {
                        userInstance.nickname = response.data.name;
                        userInstance.avatar = response.data.picture;
                        userInstance.email = response.data.email;
                    }
                } else if (state.platform === 'github') {
                    userInstance.githubId = response.data.id.toString();
                    let result = await this.userService.find({ githubId: userInstance.githubId })
                    if (result.length > 0) {
                        userInstance = result[0];
                    } else {
                        userInstance.nickname = response.data.name;
                        userInstance.avatar = response.data.avatar_url;
                        userInstance.email = response.data.email;
                    }
                }
                
                if (userInstance.id === newUserId) {
                    userInstance = await this.userService.add(userInstance);
                }
                session.user = userInstance;
                res.redirect('/oauth2/user');
            }
        } else {
            return res.json({
                statusCode: '204',
                message: '缺少参数',
                data: null
            })
        }
    }
}