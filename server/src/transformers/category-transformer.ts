import { CategoryModel } from "../models/category-model";

export class CategoryTransformer {
    transform(category: CategoryModel) {
        return {
            id: category.id,
            name: category.name
        }
    }

    transformArray(categories: CategoryModel[]) {
        return categories.map(category => this.transform(category));
    }
}