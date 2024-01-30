import { resolve, sep } from 'path'
import getURL from './getURL.helper.js'


const getURLFromPath = (path) => {
    const fileSystemPath = resolve('')
    if (fileSystemPath === path.slice(0, fileSystemPath.length)) {
        path = path.slice(fileSystemPath.length + 1 + process.env.STATIC_DIR.length + 1)
    }

    path = path.split(sep).join('/')
    return getURL(process.env.PROTOCOL, process.env.DOMAIN, process.env.PORT) + '/' + path
}

export default getURLFromPath