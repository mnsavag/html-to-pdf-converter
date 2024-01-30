import Router from 'express';
import fileUpload from 'express-fileupload';

import fileExtLimiter from '../middleware/validation/fileExtLimiter.middleware.js';
import filePayloadExist from '../middleware/validation/filesPayloadExist.middleware.js';
import filesSizeLimiter from '../middleware/validation/filesSizeLimiter.middleware.js';
import tempDirectory from '../middleware/tempDirectory.middleware.js';
import { errorHandler } from '../middleware/errorHandler.middleware.js';

import pdfConverterController from '../controllers/pdfConverter.controller.js';


const router = new Router()

router.post('/upload',
    fileUpload({
        createParentPath: true
    }),

    filePayloadExist(['file']),
    fileExtLimiter(['.zip']),
    filesSizeLimiter,
    
    tempDirectory,
    pdfConverterController.htmlToPdf,
    errorHandler
);


export default router