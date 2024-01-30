import { HttpError } from "../../utils/appError.utils.js"


const filePayloadExist = (requiredFields) => {
    return (req, res, next) => {
        let allowed = false
        if (req.files) {
            allowed = requiredFields.every(file => file in req.files)
        }

        if (!allowed) {
            throw new HttpError('Bad Request', 404, `Allowed fields: ${requiredFields.join(' ')}`)
        }
        next()
    }
}

export default filePayloadExist