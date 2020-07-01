const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: 'error', // 设置eslint报错时停止代码编译
    productionSourceMap: false, // 不需要生产环境的 source map（减小dist文件大小，加速构建）
    devServer: {
        open: true,  // npm run serve后自动打开页面
        host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
        port: 8989 // 开发服务器运行端口号
    },
    chainWebpack: (config) => {
        // 第1个参数：别名，第2个参数：路径  （设置路径别名）
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('views', resolve('./src/views'))
            .set('components', resolve('./src/components'))
            .set('assets', resolve('./src/assets'))
    },
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             prependData: `@import "./src/styles/main.scss";`
    //         }
    //     }
    // }
}