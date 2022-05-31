package fr.iut.nantes.flashme2signal.utils.PdfGenerator;

import com.lowagie.text.DocumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.Map;

public class PdfGenerateServiceImpl implements PdfGenerateService {
    private final Logger logger = LoggerFactory.getLogger(PdfGenerateServiceImpl.class);

    private final TemplateEngine templateEngine;

    @Value("${pdf.directory}")
    private String pdfDirectory;

    public PdfGenerateServiceImpl() {
        templateEngine = new TemplateEngine();
    }

    public void generatePdfFile(String templateName, Map<String, Object> data, String pdfFileName) {
        Context context = new Context();
        context.setVariables(data);

        String htmlContent = templateEngine.process(templateName, context);
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(pdfDirectory + pdfFileName);
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(htmlContent);
            renderer.layout();
            renderer.createPDF(fileOutputStream, false);
            renderer.finishPDF();
        } catch (FileNotFoundException | DocumentException e) {
            logger.error(e.getMessage(), e);
        }
    }
}