import { Entity, Column, PrimaryColumn } from 'typeorm';
import * as uuid from 'uuid/v1';

@Entity()
export class Category {

    @PrimaryColumn({ type: 'varchar', length: 100, comment: 'uuid' })
    id: string;

    @Column({ type: 'varchar', length: 100, comment: '用户id'})
    userId: string;

    @Column({ type: 'varchar', length: 100, comment: '分类名称'})
    categoryName: string;

    constructor () {
        this.id = uuid().replace(/\-/g,'');
    }
}