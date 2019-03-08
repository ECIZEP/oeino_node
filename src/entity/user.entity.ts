import { Entity, Column, PrimaryColumn } from 'typeorm';
import * as uuid from 'uuid/v1';

@Entity()
export class User {

    constructor () {
        this.createTime = parseInt((Date.now()/1000).toString());
        this.id = uuid().replace(/\-/g,'');
    }

    @PrimaryColumn({ type: 'varchar', length: 100, comment: 'uuid' })
    id: string;

    @Column({type: 'varchar', length:100, nullable: true, unique: true, comment: '微信'})
    wechat: string;

    @Column({type: 'text', nullable: true, comment: '微信信息'})
    wechatInfo: string;

    @Column({type: 'varchar', length:100, nullable: true, unique: true, comment: '微博'})
    weibo: string;

    @Column({type: 'text', nullable: true, comment: '微博信息'})
    weiboInfo: string;

    @Column({type: 'varchar', length:100, nullable: true, unique: true, comment: 'githubId'})
    githubId: string;

    @Column({type: 'text', nullable: true, comment: 'github信息'})
    githubInfo: string;

    @Column({type: 'varchar', length:100, nullable: true, unique: true, comment: 'googleId'})
    googleId: string;

    @Column({type: 'text', nullable: true, comment: 'google信息'})
    googleInfo: string;

    @Column({ type: 'varchar', length: 20, comment: '昵称' })
    nickname: string;

    @Column({ type: 'varchar', nullable: true, length: 255, comment: '头像url' })
    avatar: string;

    @Column({ type: 'varchar', default: 'default/bg.jpg', length: 255, comment: '背景url' })
    bgUrl: string;

    @Column({ type: 'varchar', nullable: true, length: 50, comment: '邮箱' })
    email: string;

    @Column({ type: 'varchar', nullable: true, length: 50, comment: '个性签名' })
    signature: string;

    @Column({ type: 'varchar', nullable: true, length: 255, comment: '个人介绍' })
    intro: string;

    @Column({ type: 'tinyint', nullable: true, default: 0, comment: '性别' })
    gender: number;

    @Column({ type: 'bigint', readonly: true, comment: '创建时间' })
    createTime: number;
}