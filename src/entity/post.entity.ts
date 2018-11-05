import { Entity, Column, PrimaryColumn } from 'typeorm';
import * as uuid from 'uuid/v1';

@Entity()
export class Post {

    @PrimaryColumn({ type: 'varchar', length: 100, comment: 'uid' })
    id: string;

    @Column({ type: 'varchar', length: 100, comment: '用户id'})
    userId: string;

    @Column({ type: 'varchar', length: 100, comment: '分类id'})
    categoryId: string;

    @Column({ type: 'varchar', length: 100, nullable: true, comment: '文章标题'})
    title: string;

    @Column({ type: 'mediumtext', nullable: true, comment: '文章内容markdown'})
    markdown: string;

    @Column({ type: 'varchar', length: 255, nullable: true, comment: '文章封面url'})
    coverUrl: string;

    @Column({ type: 'int', default: 0, comment: 'pv'})
    pageView: string;

    @Column({ type: 'bigint', readonly: true, comment: '创建时间' })
    createTime: number;

    constructor () {
        this.createTime = parseInt((Date.now()/1000).toString());
        this.id = uuid().replace(/\-/g,'');
    }
}