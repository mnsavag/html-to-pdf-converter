import pdfConverterService from "../services/pdfConverter.service.js";
import { AppError } from "../utils/appError.utils.js";
import { logger } from "../utils/loggers.utils.js";
import { PerformanceMeasure } from "../helpers/performanceMeasure.helper.js";
import fileService from "../services/file.service.js";
import * as path from 'path'
import * as fs from 'fs'


class PdfConverterController {
    async htmlToPdf(req, res) {
        const archive = req.files.file
        const metrics = new PerformanceMeasure()
        metrics.start(1000)

        const file = await fileService.saveFile(archive)
        await fileService.unzipFile(file.absolutePath)
        try {
            const pdf = await pdfConverterService.htmlToPdf(path.parse(file.name).name, file.dirPath)  
            
            metrics.end()
            const logInfo = 'name: ' + archive.name + ' ' +
                            'time: ' + (performance.now() - metrics.start) + ' ' +
                            'maxRAM: ' + (metrics.maxRAMConsumption != 0 ? metrics.maxRAMConsumption : "operating time is too short")
            logger.info(logInfo)
            res.status(200).download(pdf)         
        } catch (error) {
            throw new AppError(error)
        } finally {
            fs.rm(file.dirPath, {recursive: true, force: true}, () => {})
            metrics.end()
        }
    }
}

export default new PdfConverterController()