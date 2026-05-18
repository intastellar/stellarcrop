import { Resource } from 'resora'

/**
 * BatchResource
 */
export default class BatchResource extends Resource {
    /**
     * Transform the resource into a plain JavaScript object.
     *
     * @memberof BatchResource
     */
    data () {
        return this.toObject()
    }
}
