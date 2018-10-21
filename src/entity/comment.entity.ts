import { Entity, Column, PrimaryColumn } from 'typeorm';
import * as uuid from 'uuid/v1';

@Entity()
export class Comment {

    @PrimaryColumn({ type: 'varchar', length: 100, comment: 'uuid' })
    id: string;

    @Column({ type: 'varchar', length: 100, comment: '用户id'})
    userId: string;

    @Column({ type: 'varchar', length: 100, comment: '文章id'})
    postId: string;

    @Column({ type: 'text', nullable: true, comment: '评论内容'})
    comment: string;

    @Column({ type: 'varchar', length: 50, nullable: true, comment: '位置信息'})
    position: string;

    @Column({ type: 'int', default:0, comment: '赞同数' })
    voteCount: number;

    @Column({ type: 'int', default:0, comment: '反对数' })
    dislikeCount: number;

    @Column({ type: 'bigint', readonly: true, comment: '创建时间' })
    createTime: number;

    constructor () {
        this.createTime = parseInt((Date.now()/1000).toString());
        this.id = uuid().replace(/\-/g,'');
    }
}