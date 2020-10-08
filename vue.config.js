module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://meizizi.me/'
      }
    }
  },
  assetsDir: 'page_static',
  productionSourceMap: false,
  publicPath: './'
};
