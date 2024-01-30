import * as fs from 'fs'
import * as path from 'path';
import * as uuid from 'uuid';


const tempDirectory = (req, res, next) => {
    try {
        const dirName = uuid.v4()
        const dirPath = path.resolve(process.env.STATIC_DIR, dirName)

        req.directory = dirPath
        fs.mkdirSync(req.directory)
        
        res.on('finish', () => {
            fs.rm(req.directory, {recursive: true, force: true}, () => {})
        })
        next()
    }
    catch (error) {
        next(error)
    }
}

export default tempDirectory