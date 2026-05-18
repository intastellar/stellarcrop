import { Resource } from 'resora'

/**
 * RedemptionResource
 */
export default class RedemptionResource extends Resource {
    /**
     * Transform the resource into a plain JavaScript object.
     *
     * @memberof RedemptionResource
     */
    data() {
        return this.toObject()
    }
}
