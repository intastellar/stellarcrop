import { Migration, SchemaBuilder } from 'arkormx'

export default class CreateInvestorsTableMigration extends Migration {
    public async up (_schema: SchemaBuilder): Promise<void> {
    }

    public async down (_schema: SchemaBuilder): Promise<void> {
    }
}
