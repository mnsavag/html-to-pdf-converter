import * as path from 'path'

import getFilePath from "../helpers/getFilePath.helper.js";
import getURLFromPath from "../helpers/getURLFromPath.js"
import buildPdf from '../helpers/htmlToPdf.helper.js';

import fileService from "../services/file.service.js";
import { HttpError } from "../utils/appError.utils.js";
import { logger } from "../utils/loggers.utils.js";
import { PerformanceMeasure } from "../helpers/performanceMeasure.helper.js";


class PdfConverterService {
    async htmlToPdf(archive, saveDir) {
        const metrics = new PerformanceMeasure()
        metrics.start(1000)
        try {
            const file = await fileService.saveFile(archive, saveDir)
            await fileService.unzipFile(file.absolutePath)
    
            const indexHtmlAbsolutePath = await getFilePath(saveDir, 'index.html')
            if (!indexHtmlAbsolutePath) {
                throw new HttpError('Not Found', 404, 'index.html not found')
            }
            const indexHtmlURL = getURLFromPath(indexHtmlAbsolutePath)
            
            const pdfPath = await buildPdf(indexHtmlURL, saveDir, path.parse(file.name).name)
            return path.resolve(pdfPath)
        }
        finally {
            metrics.end()
            const logInfo = 'name: ' + archive.name + ' ' + 
                'time: ' + (performance.now() - metrics.start) + ' ' +
                'maxRAM: ' + (metrics.maxRAMConsumption != 0 ? metrics.maxRAMConsumption : "operating time is too short")
            logger.info(logInfo)
        }

    }
}

export default new PdfConverterService()