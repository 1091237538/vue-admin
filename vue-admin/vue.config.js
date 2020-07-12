const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: 'error', // 设置eslint报错时停止代码编译
    productionSourceMap: false, // 不需要生产环境的 source map（减小dist文件大小，加速构建）
    publicPath: process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
    devServer: {
        open: true,  // npm run serve后自动打开页面
        host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
        port: 8989, // 开发服务器运行端口号
        proxy: {  //配置跨域
            '/devapi': {
                target: 'http://www.web-jshtml.cn/productapi/token',  //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    '^/devapi': ''
                }
            },
        }
    },
    chainWebpack: (config) => {
        // 第1个参数：别名，第2个参数：路径  （设置路径别名）
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('views', resolve('./src/views'))
            .set('components', resolve('./src/components'))
            .set('assets', resolve('./src/assets'))
            .set('utils', resolve('./src/utils'))
            .set('api', resolve('./src/api'))
            const svgRule = config.module.rule('svg') // 找到svg-loader
            svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
            svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
            svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })

        // 修改images loader 添加svg处理
            const imagesRule = config.module.rule('images')
            imagesRule.exclude.add(resolve('src/icons'))
            config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)  
    },

}