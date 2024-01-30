import express from 'express';
import * as expressWinston from 'express-winston'
import router from './app/routes/app.routes.js';


class Application {
    useMiddleware() {
        this.app.use(express.static('public'))
        this.app.use(express.json())
        this.app.use('/api', router)
    }

    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Application listening on port ${process.env.PORT}`)
        })
    }

    async main() {
        this.app = express()
        this.useMiddleware()
        this.start()
    }
}

const appInstance = new Application()
appInstance.main()