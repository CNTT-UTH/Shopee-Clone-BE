import fs from 'fs';
import path from 'path';

const TO_SQL_FILE_PATH = path.resolve(__dirname, '..', 'src', 'dbs', 'scripts', 'attribute', 'INIT_ATTRIBUTE.SQL');
const INSERT_TEMPLATE_1 = 'INSERT INTO attributes(id, `name`) VALUES ';
const INSERT_TEMPLATE_2 = 'INSERT INTO attributes(id, name) VALUES ';

interface Attribute {
    id: string;
    name: string;
    display_name: string;
}

const toSql = (attributes: Attribute[], sqlScripts: string) => {
    for (const attri of attributes) {
        sqlScripts += INSERT_TEMPLATE_1 + `(${+attri?.['id']}, ${"'" + attri?.['display_name'] + "'"});\n`;
    }
    return sqlScripts;
};

const output = (path: string, data: string) => {
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('JSON TO SQL CATEGORY THÀNH CÔNG!', path);
        }
    });
};

let obj: Attribute[] = [];

fs.readFile(path.resolve(__dirname, '..', 'crawl', 'all_product_attributes_fixed.json'), 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        obj = JSON.parse(data);
        //    console.log(obj);

        //print tree
        // printTree(obj?.["category_list"]);

        //toSQL
        const sqlScripts = toSql(obj, '');
        console.log(sqlScripts);
        output(TO_SQL_FILE_PATH, sqlScripts);
    }
});
