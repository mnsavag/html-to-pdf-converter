import { AppError } from "../../utils/appError.utils.js"


const filePayloadExist = (requiredFields) => {
    return (req, res, next) => {
        let allowed = false
        if (req.files) {
            allowed = requiredFields.every(file => file in req.files)
        }

        if (!allowed) {
            throw new AppError('Bad Request', 404, `Allowed fields: ${requiredFields.join(' ')}`)
        }
        next()
    }
}

export default filePayloadExist