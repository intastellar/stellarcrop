import { Migration, SchemaBuilder } from 'arkormx'

export default class CreateWarehousesTableMigration extends Migration {
    public async up (_schema: SchemaBuilder): Promise<void> {
    }

    public async down (_schema: SchemaBuilder): Promise<void> {
    }
}
