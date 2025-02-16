import fs from 'fs';
import path from 'path';

const TO_SQL_FILE_PATH = path.resolve(__dirname, '..', 'src', 'dbs', 'scripts', 'attribute', 'ATTRIBUTE_CATEGORY.SQL');
const INSERT_TEMPLATE_1 = 'INSERT INTO attribute_category(attributesId, categoriesCateId) VALUES ';
const INSERT_TEMPLATE_2 = 'INSERT INTO attributes(id, name) VALUES ';

interface Cate {
    catid: number;
    parent_catid: number;
    name: string;
    display_name: string;
    attributes: Attribute[];
}

interface Attribute {
    id: string;
    name: string;
    display_name: string;
}

const toSql = (cates: Cate[], sqlScripts: string) => {
    for (const cate of cates) {
        const cate_id = cate.catid;
        for (const attri of cate['attributes']) {
            const attri_id = attri.id;
            sqlScripts += INSERT_TEMPLATE_1 + `(${attri_id}, ${cate_id});\n`;
        }
    }
    return sqlScripts;
};

const output = (path: string, data: string) => {
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('JSON TO SQL CATEGORY THÀNH CÔNG!' + path);
        }
    });
};

let obj: Cate[] = [];

fs.readFile(path.resolve(__dirname, '..', 'crawl', 'level_2_categories_with_brand.json'), 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        obj = JSON.parse(data);
        // console.log(obj);

        //print tree
        // printTree(obj?.["category_list"]);

        //toSQL
        const sqlScripts = toSql(obj, ``);
        // console.log(sqlScripts);
        output(TO_SQL_FILE_PATH, sqlScripts);
    }
});
