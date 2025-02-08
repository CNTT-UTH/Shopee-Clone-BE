import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryDTO {
    @Expose()
    cate_id?: number;

    @Expose()
    name?: string;

    @Expose()
    level?: number;

    childrens?: CategoryDTO[];

    @Expose({ name: 'parent_cate_id' })
    parent_id?: number;

    @Expose()
    image_url?: string;

    // constructor(data: Partial<CategoryDTO>) {
    //     this.cate_id = data.cate_id;
    //     this.name = data.name;
    //     this.level = data.level;
    //     this.childrens = data.childrens;
    //     this.parent_id = data.parent_id;
    //     this.image_url = data.image_url;
    // }
}
