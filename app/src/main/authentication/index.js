import services from './services'

export default class Authentication {
  constructor (name, callback) {
    this.services = services

    this.services[name].authenticate(callback)
  }
}
