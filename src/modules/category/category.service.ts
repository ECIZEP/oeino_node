import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../../entity/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
    constructor (
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    findByUserId(userId: string): Promise<Category[]> {
        return this.categoryRepository.find({
            where: {
                userId: userId
            }
        })
    }

    findById(categoryId: string): Promise<Category> {
        return this.categoryRepository.findOne({
            where: {
                id: categoryId
            }
        })
    }

    add(userId: string, categoryName: string): Promise<Category> {
        const category = new Category(userId, categoryName);
        return this.categoryRepository.save(category)
    }

    update(categoryId: string, categoryName: string) {
        return this.categoryRepository.update({
            id: categoryId
        }, {
            categoryName: categoryName
        })
    }

    delete(categoryId: string): Promise<Category> {
        const category = new Category();
        category.id = categoryId;
        return this.categoryRepository.remove(category);
    }
}