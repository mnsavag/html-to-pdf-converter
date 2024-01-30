import pdfConverterService from "../services/pdfConverter.service.js";


class PdfConverterController {
    async htmlToPdf(req, res, next) {
        try {
            const pdf = await pdfConverterService.htmlToPdf(req.files.file, req.directory)  
            res.status(200).download(pdf)         
        } catch (error) {
            next(error)
        }
    }
}

export default new PdfConverterController()