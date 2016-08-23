var path = require('path')
var nconf = require('nconf').file({file: path.join(__dirname, '/./../../surfbird.json')})

function set (key, value) {
  nconf.set(key, value)
  nconf.save()
}

function get (key) {
  nconf.load()
  return nconf.get(key)
}

module.exports = {
  get: get,
  set: set
}
