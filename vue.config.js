const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
      // eslint-disable-next-line no-unused-expressions
      [
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 5000,
          minRatio: 0.8
        })
      ]
    } else {
      // mutate for development...
    }
  },
  devServer: {
    proxy: {
      '/fserver': {
        target: 'http://10.4.0.227:5665/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/fserver': ''
        }
      }
    }
  },
  productionSourceMap: false
}
