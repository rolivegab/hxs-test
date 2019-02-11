// next.config.js
const withTypescript = require('@zeit/next-typescript')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = withTypescript({
  webpack: config => {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    config.plugins.push(new Dotenv({
      path: path.join(__dirname, '.env'),
      systemvars: true
    }))

    config.devtool = "source-map"

    config.node = {
      ...(config.node || {}),
      net: 'empty'
    }

    return config
  }
})