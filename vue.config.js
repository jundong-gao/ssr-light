const vueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const vueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.TARGET_NODE == 'node'


const target = TARGET_NODE ? 'server' : 'client'


module.exports = {
    css: {
        extract: false
    },
    outputDir: TARGET_NODE ? './dist-server' : './dist-client',
    configureWebpack: () => {
        return {
            entry: `./src/entry.${target}.js`,
            output: {
                libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
            },
            target: TARGET_NODE ? 'node' : 'web',
            node: TARGET_NODE ? undefined : false,
            optimization: {
                splitChunks: TARGET_NODE ? false : undefined
            },
            plugins: [TARGET_NODE ? new vueSSRServerPlugin() : new vueSSRClientPlugin()]
        }
    },
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap(options => {
            merge(options, {
                optimizeSSR: false
            });
            });
    }
}