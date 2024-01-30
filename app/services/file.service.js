import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';
import StreamZip from 'node-stream-zip';


class FileService {
    async saveFile(file) {
        try {
            const dirName = uuid.v4()
            const dirPath = path.resolve('public', dirName)
            const filePath = path.resolve(dirPath, file.name)
            
            await file.mv(filePath)
            return {
                name: file.name,
                dirName: dirName,
                dirPath: dirPath,
                absolutePath: filePath
            }
        } catch (e) {
            console.log(e)
        }
    }

    async unzipFile(filePath) {
        const directory = path.dirname(filePath)
        try {
            const zip = new StreamZip.async({ file: filePath});
            await zip.extract(null, directory)
            fs.unlinkSync(filePath)
            await zip.close()
        } catch (error) {
            console.log(error)
        }
    }
}

export default new FileService()