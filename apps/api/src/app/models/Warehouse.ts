import { Model } from '@arkstack/database'

import { WarehouseFactory } from './../../database/factories/WarehouseFactory'

export class Warehouse extends Model {
    protected static override table = 'warehouses'
    protected static override factoryClass = WarehouseFactory
}
