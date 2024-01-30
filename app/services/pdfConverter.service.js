import * as path from 'path';

import { AppError } from "../utils/appError.utils.js";
import getFilePath from "../helpers/getFilePath.helper.js";
import getDefaultPath from "../helpers/getDeafultPathFromAbs.helper.js"
import buildPdf from '../helpers/htmlToPdf.helper.js';


class PdfConverterService {
    async htmlToPdf(fileName, htmlDir) {
        const indexHtmlAbsolutePath = await getFilePath(htmlDir, 'index.html') // сервис?
        if (!indexHtmlAbsolutePath) {
            throw new AppError('Not Found', 404, 'index.html not found')
        }
        const indexHtmlServerPath = await getDefaultPath(indexHtmlAbsolutePath)

        const pdfPath = await buildPdf(indexHtmlServerPath, htmlDir, fileName)
        return path.resolve(pdfPath)
        // обработка ошибок???
    }
}

export default new PdfConverterService()