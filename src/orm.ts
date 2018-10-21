import { createConnection } from 'typeorm';
import { User } from './entity/user.entity';

createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "Hotsoon@2018",
    "database": "oeino",
    "entities": ["nest/**/**.entity{.ts,.js}"]
}).then(async connection => {
    let user = new User();
    user.nickname = 'test';
    user.createTime = parseInt((Date.now() / 1000).toString());

    let userRepo = connection.getRepository(User);
    let result = await userRepo.save(user);
    console.log(result);
})
