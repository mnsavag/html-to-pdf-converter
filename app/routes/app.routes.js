import fileUpload from 'express-fileupload';
import Router from 'express';

import fileExtLimiter from '../middleware/validation/fileExtLimiter.middleware.js';
import filePayloadExist from '../middleware/validation/filesPayloadExist.middleware.js';
import filesSizeLimiter from '../middleware/validation/filesSizeLimiter.middleware.js';
import pdfConverterController from '../controllers/pdfConverter.controller.js';
import { errorHandler } from '../middleware/errorHandler.middleware.js';


const router = new Router()

router.post('/upload',
    fileUpload({
        createParentPath: true
    }),

    filePayloadExist(['file']),
    fileExtLimiter(['.zip']),
    filesSizeLimiter,

    pdfConverterController.htmlToPdf,
    errorHandler
);


export default router