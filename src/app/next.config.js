// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  webpack(config) {
    config.resolve.alias['~'] = path.resolve(__dirname)
    return config
  },
  // css
  cssModules: true,
  distDir: '../../dist/functions/next',
}
