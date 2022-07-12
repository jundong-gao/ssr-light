import { createApp } from './main'
export default context => {
    return new Promise((resolve, reject) => {
        const {app, router} = createApp()

        router.push(context.url)

        router.onReady(()=> {
            let matchComponent = router.getMatchedComponents()

            if(!matchComponent.length) return reject({code: 404})

            resolve(app)

        }, reject)
    }).catch(e => console.log('e::::::::::::::::', e))
}