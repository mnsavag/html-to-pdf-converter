import { logger } from "../utils/loggers.utils.js"
import { HttpError } from "../utils/appError.utils.js"


export const errorHandler = (error, req, res, next) => {
    logger.error(error)
    
    if (error instanceof HttpError) {
        if (error.status != 500) {
            res.status(error.status).json({
                name: error.name,
                status: error.status,
                description: error.message
            })
        }
        else {
            res.status(error.status).json({
                name: error.name,
                status: error.status,
            })
        }
    }
    else {
        res.status(500).json({
            name: "Internal Server Error",
            status: 500,
        })
    }
}