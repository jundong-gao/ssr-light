const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)

app.use(express.static(resolve('./dist-client'), {index: false}))


const serverBundle = require('./dist-server/vue-ssr-server-bundle.json')
const clientManifest = require('./dist-client/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
    clientManifest: clientManifest,
    template: fs.readFileSync(resolve('./public/index.temp.html'), 'utf-8'),
    runInNewContext: false
})

const renderToString = context => {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context).then(resolve).catch(reject)
    })
}




app.get('*', async (req, res) => {
    const context = {
        url: req.url,
        title: 'asdasda'
    }

    const html = await renderToString(context)

    console.log(html)


    // res.setHeader('')
    res.send(html)
})


app.listen(3000, () => {
    console.log('已启动::::::::::::::::', 'http://localhost:3000')
})

