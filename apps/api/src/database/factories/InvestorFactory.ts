import { ModelFactory } from 'arkormx'
import { Investor } from './../../app/models/Investor'

export class InvestorFactory extends ModelFactory<Investor> {
    protected model = Investor

    protected definition (_sequence: number) {
        return {}
    }
}
