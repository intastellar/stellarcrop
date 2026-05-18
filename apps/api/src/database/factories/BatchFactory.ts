import { ModelFactory } from 'arkormx'
import { Batch } from './../../app/models/Batch'

export class BatchFactory extends ModelFactory<Batch> {
    protected model = Batch

    protected definition (_sequence: number) {
        return {}
    }
}
