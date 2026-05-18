import { ModelFactory } from 'arkormx'
import { Operator } from './../../app/models/Operator'

export class OperatorFactory extends ModelFactory<Operator> {
    protected model = Operator

    protected definition (_sequence: number) {
        return {}
    }
}
