module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/travel/' : '/',

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/all.scss";`
      }
    }
  }
};