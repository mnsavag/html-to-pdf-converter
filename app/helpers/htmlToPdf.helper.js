import fs from 'fs';
import * as path from 'path';
import wkhtmltopdf from 'wkhtmltopdf';

import { HttpError } from '../utils/appError.utils.js';


const buildPdf = async (htmlURL, outputDir, outputFileName) => {
    return new Promise((resolve, reject) => {
        wkhtmltopdf.command = process.env.WKHTMLTOPPDF_PATH_DRIVER
        
        const outputFile = path.resolve(outputDir, `${outputFileName}.pdf`)
		wkhtmltopdf(htmlURL, { pageSize: 'A4'}, (err, stream) => {
			if (err) {
				throw new HttpError('Internal Server Error', 500, `${htmlFullPath} converting error`)
			} else {
                const writeStream = fs.createWriteStream(outputFile)
                writeStream.on('finish', () => resolve(outputFile) )
                stream.pipe(writeStream)
			}
		});
	});
}

export default buildPdf