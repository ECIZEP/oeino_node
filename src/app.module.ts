import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { OAuth2Module } from './modules/oAuth2/oAuth2.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CategoryModule } from './modules/category/category.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        OAuth2Module,
        UserModule,
        CategoryModule,
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            context: (context) => {
                const { req, res } = context;
                // if (req.session && !req.session.user) res.json({statusCode:203})
                return context
            },
            formatResponse: response => {
                return response
            },
            formatError: error => {
                console.log(error);
                /* const { code } = error.extensions;
                if (code === 'UNAUTHENTICATED') {
                    error.extensions.loginUrl = 'http://oeino.cn/dashboard/index.html/#/login'
                } */
                return error;
            },
            playground: {
                settings: {
                    "editor.theme": 'light',
                    "editor.cursorShape": "line",
                    "request.credentials": "include"
                }
            },
            cors: {
                origin: ["http://local.oeino.cn:3031"],
                allowedHeaders: ["content-type"],
                methods: ['OPTIONS', 'POST'],
                credentials: true
            }
        })
    ]
})
export class AppModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/')
    }
}
