import { ResourceCollection } from 'resora'

/**
 * BatchCollection
 */
export default class BatchCollection extends ResourceCollection {
    /**
     * Transform the resource into a plain JavaScript object.
     *
     * @memberof BatchCollection
     */
    data() {
        return this.toObject()
    }
}
