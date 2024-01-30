import path from "path";
import { AppError } from "../../utils/appError.utils.js"


const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files
        
        const fileExtensions = []
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
        })

        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))
        
        if (!allowed) {
            throw new AppError('Bad Request', 404, `Allowed extensions: ${allowedExtArray.join(' ')}`)
        }

        next()
    }
}

export default fileExtLimiter