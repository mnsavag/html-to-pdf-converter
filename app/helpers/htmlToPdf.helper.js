import wkhtmltopdf from 'wkhtmltopdf';
import fs from 'fs';
import * as path from 'path';

import getURL from './getURL.helper.js';
import { AppError } from '../utils/appError.utils.js';


const buildPdf = async (htmlPath, outputDir, outputFileName) => {
    return new Promise((resolve, reject) => {
        wkhtmltopdf.command = process.env.WKHTMLTOPPDF_PATH_DRIVER
        
        const htmlFullPath = getURL() + '/' + htmlPath.split(path.sep).join('/')
        const outputFile = path.resolve(outputDir, `${outputFileName}.pdf`)
		wkhtmltopdf(htmlFullPath, { pageSize: 'A4'}, (err, stream) => {
			if (err) {
				throw new AppError('Internal Server Error', 500, `${htmlFullPath} converting error`)
			} else {
                const writeStream = fs.createWriteStream(outputFile)
                writeStream.on('finish', () => resolve(outputFile) )
                stream.pipe(writeStream)
			}
		});
	});
}

export default buildPdf