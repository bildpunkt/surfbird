const files = require.context('.', false, /\.js$/)
const clients = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  clients[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default clients
