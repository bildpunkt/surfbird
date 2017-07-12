import fs from 'fs'
import path from 'path'

import services from './services'
import credentials from './../../../resources/credentials.json'

export default class Authentication {
  constructor (name, callback) {
    this.services = services

    this.services[name].authenticate(credentials[name], callback)
  }

  static addToken (token, callback) {
    let tokens = Authentication.load()

    if (tokens === null) {
      tokens = []
    }

    tokens.push(token)
    Authentication.save(Authentication.uniqueAccounts(tokens))
    callback()
  }

  static allAccounts () {
    return Authentication.load() || []
  }

  static uniqueAccounts (tokens) {
    var names = []
    var uniqueList = []

    for (let token of tokens) {
      if (names.indexOf(token['id_str']) < 0) {
        uniqueList.push(token)
        names.push(token['id_str'])
      }
    }
    return uniqueList
  }

  static save (data) {
    let file = path.join(Authentication.homePath(), '.surfbird')
    let ret = fs.writeFileSync(file, JSON.stringify(data))

    if (process.platform !== 'win32') {
      fs.chmodSync(file, '600')
    }

    return ret
  }

  static load () {
    let file = path.join(Authentication.homePath(), '.surfbird')

    if (!fs.existsSync(file)) {
      return null
    }

    return JSON.parse(fs.readFileSync(file, 'utf-8'))
  }

  static homePath () {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
  }

  static allServices () {
    let srvArr = []

    for (let property in services) {
      srvArr.push(services[property].data())
    }

    return srvArr
  }
}
