import { Model } from '@arkstack/database'

import { BatchFactory } from './../../database/factories/BatchFactory'

export class Batch extends Model {
    protected static override table = 'batches'
    protected static override factoryClass = BatchFactory
}
