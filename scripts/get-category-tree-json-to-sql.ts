import fs from "fs";
import path from "path";

const TO_SQL_FILE_PATH = path.resolve(__dirname, "..", "src", "dbs", "scripts", "category", "INIT_CATEGORIES.SQL");
const INSERT_TEMPLATE_1 = "INSERT INTO categories(cate_id, name, parent_cate_id, `level`, image_url) VALUES ";
const INSERT_TEMPLATE_2 = "INSERT INTO categories(cate_id, name, `level`, image_url) VALUES ";
const IMAGE_ROOT_URL = "https://down-vn.img.susercontent.com/file/";

const printTree = (parent: []) => {
     for (const props of parent) {
          const level: number = props?.["level"];
          console.log(`${"|\t".repeat(level - 1)}|_____ ${props?.["display_name"]}`);
          if (props?.["children"]) printTree(props?.["children"]);
     }
}

const toSql = (parent: [], sqlScripts: string) => {
     for (const props of parent) {
          const level: number = props?.["level"];
          // console.log(`${"|\t".repeat(level - 1)}|_____ ${props?.["display_name"]}`);
          let script = ``
          if (level != 1) {
               script = `${INSERT_TEMPLATE_1} (${props?.['catid']}, '${props?.['display_name']}', ${props?.['parent_catid']}, ${level}, '${IMAGE_ROOT_URL + props?.['image']}')`
          }
          else {
               script = `${INSERT_TEMPLATE_2} (${props?.['catid']}, '${props?.['display_name']}', ${level}, '${IMAGE_ROOT_URL + props?.['image']}')`

          }
          sqlScripts += "\n" + script;
          if (props?.["children"]) sqlScripts = toSql(props?.["children"], sqlScripts);
     }
     return sqlScripts;
     
}

const output = (path: string, data: string) => {
     fs.writeFile(path, data, (err) => {
          if (err) {
               console.log(err);
          }
          else {
               console.log("JSON TO SQL CATEGORY THÀNH CÔNG!");
          }
     });
}


let obj: {
     [index: string]: any;
} = {};
fs.readFile(path.resolve(__dirname, "..", "crawl", "get_category_tree.json"), 'utf8', (err, data) => {
     if (err) {
          console.log(err);
     }
     else {
          obj = JSON.parse(data);

          //print tree 
          // printTree(obj?.["category_list"]);

          //toSQL
          const sqlScripts = toSql(obj?.["category_list"], "");
          console.log(sqlScripts);
          output(TO_SQL_FILE_PATH, sqlScripts);
     }
})

