import { Resource } from 'resora'

/**
 * SettlementResource
 */
export default class SettlementResource extends Resource {
    /**
     * Transform the resource into a plain JavaScript object.
     *
     * @memberof SettlementResource
     */
    data() {
        return this.toObject()
    }
}
