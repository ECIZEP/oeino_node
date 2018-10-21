import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { OAuth2Module } from './modules/oAuth2/oAuth2.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        OAuth2Module,
        UserModule,
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
            playground: {
                
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
