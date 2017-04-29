import glob from 'glob'
import path from 'path'

const files = glob.sync(`${__dirname}/*.js`)
const services = {}

files.forEach((file) => {
  const newfile = './' + path.basename(file)
  if (newfile === './index.js') return
  services[newfile.replace(/(\.\/|\.js)/g, '')] = require(newfile).default
})

export default services
