import { Resource } from 'resora'

/**
 * InvestorResource
 */
export default class InvestorResource extends Resource {
    /**
     * Transform the resource into a plain JavaScript object.
     *
     * @memberof InvestorResource
     */
    data () {
        return this.toObject()
    }
}
