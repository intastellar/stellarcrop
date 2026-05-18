import { ModelFactory } from 'arkormx'
import { Warehouse } from './../../app/models/Warehouse'

export class WarehouseFactory extends ModelFactory<Warehouse> {
    protected model = Warehouse

    protected definition (_sequence: number) {
        return {}
    }
}
