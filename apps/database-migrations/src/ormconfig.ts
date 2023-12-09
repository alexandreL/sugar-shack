import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DataSource, DataSourceOptions } from 'typeorm'
import * as entities from '@sugar-shack/entity'
import * as migrations from './migration'

// const config: DataSourceOptions = {
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT || '5432', 10),
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     schema: 'public',
//     logging: [ 'migration', 'schema' ],
//     migrationsTableName: 'migration_table',
//     entities: entities,
//     migrations: migrations,
//     synchronize: false,
//     namingStrategy: new SnakeNamingStrategy(),
//     cache: false,
// }
const config: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    namingStrategy: new SnakeNamingStrategy(),
    entities: entities,
    migrations: migrations,
}

const dataSource = new DataSource(config)
export default dataSource
