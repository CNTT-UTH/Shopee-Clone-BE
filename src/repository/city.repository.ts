import { EntityManager } from 'typeorm';
import AppDataSource from '~/dbs/db';

export class CityRepository {
    private manager: EntityManager;

    constructor() {
        this.manager = AppDataSource.manager;
    }

    async getAllCity() {
        const data = await this.manager.query(`SELECT ${`code`}, ${`full_name`} FROM ${`provinces`}`);

        return data;
    }

    async getAllDistrict(city_code: string) {
        const data = await this.manager.query(
            `SELECT ${`code`}, ${`full_name`} FROM ${`districts`} WHERE ${`province_code`} = ${city_code}`,
        );

        return data;
    }

    async getAllWard(district_code: string) {
        const data = await this.manager.query(
            `SELECT ${`code`}, ${`full_name`} FROM ${`wards`} WHERE ${`district_code`} = ${district_code}`,
        );

        return data;
    }
}
