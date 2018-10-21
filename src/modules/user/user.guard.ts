import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const req = context.getArgByIndex(2).req;
        if (req.session && !req.session.user) return false;
        return true
    }
}