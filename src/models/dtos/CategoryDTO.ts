export class CategoryDTO {
    cate_id?: number;
    name?: string;
    level?: number;
    childrens?: CategoryDTO[];
    parent_id?: number;
    image_url?: string;

    constructor(data: Partial<CategoryDTO>) {
        this.cate_id = data.cate_id;
        this.name = data.name;
        this.level = data.level;
        this.childrens = data.childrens;
        this.parent_id = data.parent_id;
        this.image_url = data.image_url;
    }
}
