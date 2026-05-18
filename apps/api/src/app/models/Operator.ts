import { Model } from '@arkstack/database'

import { OperatorFactory } from './../../database/factories/OperatorFactory'

export class Operator extends Model {
    protected static override table = 'operators'
    protected static override factoryClass = OperatorFactory
}
