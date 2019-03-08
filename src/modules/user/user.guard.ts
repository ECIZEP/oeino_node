import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { NotLoginError } from "../../util/errors";

@Injectable()
export class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const req = context.getArgByIndex(2).req;
        if (req.session && !req.session.user) throw new NotLoginError('User Not Login');
        return true
    }
}