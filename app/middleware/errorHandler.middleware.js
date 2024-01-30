import { logger } from "../utils/loggers.utils.js"


export const errorHandler = (error, req, res, next) => {
    logger.error(error) // info() ???
    
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