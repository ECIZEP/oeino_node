import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            console.log('[Access Log]: ' + req.method + "-" + req.originalUrl);
            next();
        }
    }
}