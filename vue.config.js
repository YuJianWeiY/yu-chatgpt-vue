const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 代理到后端 API 服务器
    proxy: 'http://43.130.240.98:15001',
  },
});
