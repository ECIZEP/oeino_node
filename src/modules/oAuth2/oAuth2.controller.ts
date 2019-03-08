import { Controller, Get, Query, Session, Response, UseGuards } from '@nestjs/common';
import oAuth2Config from '../../config/oAuth2.config';
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
                    platform: query.platform,
                    returnUrl: query.returnUrl
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
        res.redirect('/dashboard/index.html/#login');
    }

    @Get('oauth2callback')
    async codeToToken (@Query() query, @Session() session, @Response() res) {
        if (!!query.code && !!query.state) {
            let state = JSON.parse(query.state),
                weibo = '',
                accessToken = '';
            let platformConfig = oAuth2Config[state.platform];
            // code取token
            let response;
            try {
                response = await axios.post(platformConfig.accessTokenUri, querystring.stringify({
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
            } catch (e) {
                console.log(e);
            }
            console.log(response);
            if (response.status === 200 && !!response.data) {
                let data = response.data;
                if (state.platform === 'github') {
                    data = querystring.parse(data);
                } else if (state.platform === 'weibo') {
                    weibo = data.uid;
                }
                accessToken = data.access_token;
            } else {
                console.log(response);
            }
            // token拿信息
            try {
                let params = {
                    access_token: accessToken,
                    uid: weibo
                };
                if (state.platform !== 'weibo') {
                    delete params.uid;
                }
                response = await axios.get(platformConfig.userInfoUri, { params })
            } catch (e) {
                console.log(e);
            }
            if (response.status === 200 && !!response.data) {
                let userInstance = new User();
                let newUserId = userInstance.id;
                if (state.platform === 'google') {
                    userInstance.googleId = response.data.id.toString();
                    let result = await this.userService.findOneById({ googleId: userInstance.googleId })
                    if (result) {
                        userInstance = result;
                    } else {
                        userInstance.nickname = response.data.name;
                        userInstance.avatar = response.data.picture;
                        userInstance.email = response.data.email;
                    }
                } else if (state.platform === 'github') {
                    userInstance.githubId = response.data.id.toString();
                    let result = await this.userService.findOneById({ githubId: userInstance.githubId })
                    if (result) {
                        userInstance = result;
                    } else {
                        userInstance.nickname = response.data.name;
                        userInstance.avatar = response.data.avatar_url;
                        userInstance.email = response.data.email;
                    }
                } else if (state.platform === 'weibo') {
                    userInstance.weibo = response.data.idstr;
                    let result = await this.userService.findOneById({ weibo: userInstance.weibo })
                    if (result) {
                        userInstance = result;
                    } else {
                        let map = { m: 1, f: 2, n: 0 };
                        userInstance.nickname = response.data.name;
                        userInstance.avatar = response.data.avatar_hd;
                        userInstance.gender = map[response.data.gender] || 0;
                    }
                }
                
                if (userInstance.id === newUserId) {
                    userInstance = await this.userService.add(userInstance);
                }
                session.user = userInstance;
                res.redirect(state.returnUrl || '/');
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