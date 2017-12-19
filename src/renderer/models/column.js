import { generateId } from '../util/id-generator'

export default class Column {
  constructor (name, type, owner) {
    this.name = name
    this.type = type
    this.owner = owner
    this.id = generateId()

    this.postStorage = {ids: [], posts: {}}
  }
}
