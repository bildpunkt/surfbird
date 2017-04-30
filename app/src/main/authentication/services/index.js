import glob from 'glob'
import path from 'path'

const services = {}

if (process.env.NODE_ENV === 'production') {
  const files = require.context('.', false, /\.js$/)

  files.keys().forEach((key) => {
    if (key === './index.js') return
    services[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
  })
} else {
  const files = glob.sync(`${__dirname}/*.js`)

  files.forEach((file) => {
    const newfile = './' + path.basename(file)
    if (newfile === './index.js') return
    services[newfile.replace(/(\.\/|\.js)/g, '')] = require(newfile).default
  })
}

export default services
