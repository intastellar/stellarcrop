import { Model } from '@arkstack/database'

import { InvestorFactory } from './../../database/factories/InvestorFactory'

export class Investor extends Model {
    protected static override table = 'investors'
    protected static override factoryClass = InvestorFactory
}
