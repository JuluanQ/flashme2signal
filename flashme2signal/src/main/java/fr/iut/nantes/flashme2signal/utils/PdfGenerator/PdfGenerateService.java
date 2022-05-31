package fr.iut.nantes.flashme2signal.utils.PdfGenerator;

import java.util.Map;

public interface PdfGenerateService {

    void generatePdfFile(String templateName, Map<String, Object> data, String pdfFileName);

}
