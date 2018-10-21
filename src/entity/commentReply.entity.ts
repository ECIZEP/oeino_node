import { Entity, Column, PrimaryColumn } from 'typeorm';
import * as uuid from 'uuid/v1';

@Entity()
export class CommentReply {

    @PrimaryColumn({ type: 'varchar', length: 100, comment: 'uuid' })
    id: string;

    @Column({ type: 'varchar', length: 100, comment: '用户id'})
    userId: string;

    @Column({ type: 'varchar', length: 100, comment: '评论id'})
    commentId: string;

    @Column({ type: 'text', nullable: true, comment: '评论内容'})
    comment: string;

    @Column({ type: 'varchar', length: 50, nullable: true, comment: '位置信息'})
    position: string;

    @Column({ type: 'bigint', readonly: true, comment: '创建时间' })
    createTime: number;

    constructor () {
        this.createTime = parseInt((Date.now()/1000).toString());
        this.id = uuid().replace(/\-/g,'');
    }
}