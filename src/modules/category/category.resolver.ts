import { Resolver, Context, Query, Mutation, Args } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "../../entity/category.entity";
import { ServerUnavailableError } from "../../util/errors";

@Resolver('Category')
export class CategoryResolver {
    constructor (
        private readonly categoryService: CategoryService
    ) {}
    
    userId(ctx): string {
        return ctx.req.session.user.id;
    }

    @Query('getCategory')
    async getUserCategory(@Context() ctx) {
        let result = await this.categoryService.findByUserId(this.userId(ctx));
        if (result instanceof Array) {
            return result;
        } else {
            throw new ServerUnavailableError('Service Error: findByUserId');
        }
    }

    @Mutation('createCategory')
    async createCategory(@Context() ctx, @Args() args) {
        const { categoryName } = args;
        let result = await this.categoryService.add(this.userId(ctx), categoryName);
        if (result instanceof Category) {
            return result;
        } else {
            throw new ServerUnavailableError('Service Error: add')
        }
    }

    @Mutation('updateCategory')
    async updateCategory(@Args() args) {
        const { categoryId, categoryName } = args;
        let result = await this.categoryService.update(categoryId, categoryName);
        if (result.raw.affectedRows === 1) {
            let updatedCategory = await this.categoryService.findById(categoryId);
            return updatedCategory;
        }
    }

    @Mutation('deleteCategory')
    async deleteCategory(@Args() args) {
        const { categoryId } = args;
        let result = await this.categoryService.delete(categoryId);
        if (result instanceof Category && !result.id) {
            return true;
        } else {
            throw new ServerUnavailableError('Service Error: delete')
        }
    }
}