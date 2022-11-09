const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')
const config = getDefaultConfig(__dirname)

const domainPath = __dirname + '/../domain'
const infraPath = __dirname + '/../infrastructure'

const extraNodeModules = {
  domain: path.resolve(domainPath), 
  infrastructure: path.resolve(infraPath), 
}

config.watchFolders = [
    path.resolve(domainPath), 
    path.resolve(infraPath),
]

config.resolver.extraNodeModules = new Proxy(extraNodeModules, {
  get: (target, name) =>
    name in target
      ? target[name]
      : path.join(process.cwd(), `node_modules/${name}`)
})

config.resolver.assetExts.push("cjs");


module.exports = config