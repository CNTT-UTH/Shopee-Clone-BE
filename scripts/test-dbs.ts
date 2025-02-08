import AppDataSource from './../src/dbs/db';

AppDataSource.initialize()
    .then(() => {
        console.log(AppDataSource.entityMetadatas.map((e) => e.name));
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
