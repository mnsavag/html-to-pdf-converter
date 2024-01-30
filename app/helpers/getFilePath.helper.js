import { join, basename } from 'path';
import { statSync, readdirSync } from 'fs';


const getFilePath = async (directory, fileName) => {
    let resultPath = ''
    function findFile(directory, fileName) {
        if (resultPath) {
            return resultPath
        }
        readdirSync(directory).forEach(file => {
            const absolutePath = join(directory, file)
    
            if (statSync(absolutePath).isDirectory()) {
                return findFile(absolutePath, fileName)
            } 
            else if (statSync(absolutePath).isFile()) {
                if (basename(absolutePath) === fileName)
                    resultPath = absolutePath
            }   
        })
        return resultPath
    }
    resultPath =  findFile(directory, fileName)
    return resultPath
}

export default getFilePath