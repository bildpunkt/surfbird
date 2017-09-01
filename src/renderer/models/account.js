import clients from '../clients'

export default class Account {
  constructor (tokens, service) {
    this.client = new clients[service](tokens)
  }
}
