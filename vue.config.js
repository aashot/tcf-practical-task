module.exports = {
  runtimeCompiler: true,
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/helpers/_variables.scss";
          @import "@/scss/helpers/_mixins.scss";
        `
      }
    }
  }
}