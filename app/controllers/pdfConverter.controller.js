import pdfConverterService from "../services/pdfConverter.service.js";


class PdfConverterController {
    async htmlToPdf(req, res, next) {
        const archive = req.files.file
        try {
            const pdf = await pdfConverterService.htmlToPdf(archive, req.directory)  
            res.status(200).download(pdf)         
        } catch (error) {
            next(error)
        }
    }
}

export default new PdfConverterController()