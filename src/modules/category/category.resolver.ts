import { Resolver, Context, Query, Mutation, Args } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "../../entity/category.entity";

@Resolver('Category')
export class CategoryResolver {
    constructor (
        private readonly categoryService: CategoryService
    ) {}
    
    userId(ctx): string {
        return ctx.req.session.user.id;
    }

    @Query('getCategory')
    getUserCategory(@Context() ctx) {
        return this.categoryService.findByUserId(this.userId(ctx));
    }

    @Mutation('createCategory')
    createCategory(@Context() ctx, @Args() args) {
        const { categoryName } = args;
        return this.categoryService.add(this.userId(ctx), categoryName);
    }

    @Mutation('updateCategory')
    async updateCategory(@Args() args) {
        const { categoryId, categoryName } = args;
        let result = await this.categoryService.update(categoryId, categoryName);
        console.log(result);
        return !!result;
    }

    @Mutation('deleteCategory')
    async deleteCategory(@Args() args) {
        const { categoryId } = args;
        let result = await this.categoryService.delete(categoryId);
        return result instanceof Category && !result.id;
    }
}