import {
    ApolloError,
    SyntaxError,
    ValidationError,
    AuthenticationError,
    ForbiddenError,
    UserInputError
} from 'apollo-server-express';

class ServerUnavailableError extends ApolloError {
    constructor(message: string, properties?: Record<string, any>) {
        super(message, 'SERVER_UNAVAILABLE');

        Object.defineProperty(this, 'name', {
            value: 'ServerUnavailableError',
        });
    }
}

class NotLoginError extends ApolloError {
    constructor(message: string, properties?: Record<string, any>) {
        super(message, 'NOT_LOGIN', {
            loginUrl: '//oeino.cn/dashboard/index.html/#/login'
        });

        Object.defineProperty(this, 'name', {
            value: 'NotLoginError',
        });
    }
}

class ParamsInvalideError extends ApolloError {
    constructor(message: string, properties?: Record<string, any>) {
        super(message, 'PARAMS_INVALIDE');

        Object.defineProperty(this, 'name', {
            value: 'ParamsInvalideError',
        });
    }
}

export {
    SyntaxError,
    ValidationError,
    AuthenticationError,
    ForbiddenError,
    UserInputError,
    ServerUnavailableError,
    ParamsInvalideError,
    NotLoginError
}