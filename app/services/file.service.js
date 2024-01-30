import * as fs from 'fs';
import * as path from 'path';
import StreamZip from 'node-stream-zip';


class FileService {
    async saveFile(file, dirPath) {
        try {
            const dirName = path.dirname(dirPath)
            const filePath = path.resolve(dirPath, file.name)
            await file.mv(filePath)
            return {
                name: file.name,
                dirName: dirName,
                dirPath: dirPath,
                absolutePath: filePath
            }
        } catch (e) {
            throw new Error(`${file.name} file save error`)
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
            throw new Error(`${file.name} unzip file error`)
        }
    }
}

export default new FileService()