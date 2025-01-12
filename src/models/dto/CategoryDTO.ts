export class CategoryDTO {
    cate_id: string;
    name: string;
    level: number;
    childrens: CategoryDTO[];
    parent_id: string;
    image_url: string;
}
