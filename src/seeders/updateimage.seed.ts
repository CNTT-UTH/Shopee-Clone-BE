import path from 'path';
import fs from 'fs';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import AppDataSource from '~/dbs/db';
import { Product as ProductDTO } from './data/model';
import { Product } from '~/models/entity/product.entity';

const RAW_PRODUCT_JSON_DATA = path.join(__dirname, 'data', 'PRODUCT_DATA.JSON');
const RAW_SHOP_JSON_DATA = path.join(__dirname, 'data', 'SHOP_DATA.JSON');

const readData = async (path: string) => {
    const data = fs.readFileSync(path, 'utf-8');

    return JSON.parse(data);
};

export default class InitialDatabaseSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const queryRunner = AppDataSource.manager.queryRunner;

        const productList: ProductDTO[] = await readData(RAW_PRODUCT_JSON_DATA);

        const id_product: number = 1;

        for (const product of productList) {
            try {
                await connection.getRepository(Product).update(
                    { _id: product.itemid },
                    {
                        image: product.images?.[0] ?? '',
                    },
                );
            } catch (error) {
                console.log(error);
            }
        }
    }
}
