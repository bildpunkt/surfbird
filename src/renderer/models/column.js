export default class Column {
  constructor (name, type, owner) {
    this.name = name
    this.type = type
    this.owner = owner

    this.postStorage = {ids: [], posts: {}}
  }
}
