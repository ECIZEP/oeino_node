export default {
    google: {
        clientId: '217530000703-eghjru5lh41fl5p6bit9dik6m2mj3llo.apps.googleusercontent.com',
        clientSecret: 'n00t3I6lXSeBcoQIhMvdTrzr',
        authorizationUri: 'https://accounts.google.com/o/oauth2/v2/auth',
        accessTokenUri: 'https://www.googleapis.com/oauth2/v4/token',
        redirectUri: 'http://oeino.cn/oauth2/oauth2callback',
        userInfoUri: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
    },
    github: {
        clientId: '8d94a76b0f9011352f0f',
        clientSecret: 'e7c6049eb374b9e9a3f54380fc19daf97725bf20',
        authorizationUri: 'https://github.com/login/oauth/authorize',
        accessTokenUri: 'https://github.com/login/oauth/access_token',
        redirectUri: 'http://oeino.cn/oauth2/oauth2callback',
        userInfoUri: 'https://api.github.com/user',
        scope: 'read:user user:email'
    }
}