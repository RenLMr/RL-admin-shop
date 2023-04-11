const { defineConfig } = require("@vue/cli-service")
const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers")
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin")

module.exports = defineConfig({
  devServer: {
    proxy: {
      "/api": {
        target: "http://shopapi.2yuecloud.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: process.env.NODE_ENV !== "production",
  configureWebpack: {
    plugins: [
      new WindiCSSWebpackPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
