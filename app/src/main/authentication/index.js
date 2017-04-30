import services from './services'
import credentials from './../../../resources/credentials.json'

export default class Authentication {
  constructor (name, callback) {
    this.services = services

    this.services[name].authenticate(credentials[name], callback)
  }
}
