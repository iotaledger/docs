// this file exports a bunch of replacements
// that are made across the source-code

const { NODE_ENV } = process.env

module.exports = {
  VERSION: require('./package').version,
  'process.env.NODE_ENV': NODE_ENV,
  IMAGE_ASSETS_URL: '/static',
  VIDEO_ASSETS_URL: '/static',
  RAW_ASSETS_URL: '/static'
}
