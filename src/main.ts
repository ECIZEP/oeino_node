import { resolve } from 'path';
import { readFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import chalk from 'chalk';
import config from './config/index';
import * as session from 'express-session';
import * as fileStore from 'session-file-store';

let FileStore = fileStore(session);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(session({
        // cookie中保存session id的字段名称
        name: config.session.key,
        // hash secret的值放在cookie中，防止cookie篡改
        secret: config.session.secret,
        // 强制更新 session
        resave: true,
        // 设置为 false，强制创建一个 session，即使用户未登录
        saveUninitialized: false,
        cookie: {
            domain: 'oeino.cn'
        },
        store: new FileStore()
    }));
    app.use('/static', express.static(resolve(__dirname, '../static/')));
    app.use('/favicon.ico', express.static(resolve(__dirname, '../favicon.ico')));

    await app.listen(3000, () => console.log('Nest Server listening on port 3000'));
}
bootstrap();
