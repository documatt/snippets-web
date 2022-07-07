module.exports = {
  lintOnSave: false,

  chainWebpack: config => {
    // Raw loader. Allows import file as a string ('import example from
    // example.txt')
    config.module
      .rule('raw')
      .test(/\.(txt|rst)$/i)
      .use('raw-loader')
        .loader('raw-loader').end()
  }
}
