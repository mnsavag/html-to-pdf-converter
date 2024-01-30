import { AppError } from "../../utils/appError.utils.js"


const GB = 2 // 2 GB
const FILE_SIZE_LIMIT = GB * 1024 * 1024 * 1024

const filesSizeLimiter = (req, res, next) => {
    const files = req.files
    for (const fileName in files) {
        if (files[fileName].size > FILE_SIZE_LIMIT) {
            throw new AppError('Bad Request', 404, `${files[fileName].name} size exceeds ${GB} gigabytes`)
        }
    }
    next()
}

export default filesSizeLimiter