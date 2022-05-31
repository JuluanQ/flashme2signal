package fr.iut.nantes.flashme2signal.utils.PdfGenerator;

import fr.iut.nantes.flashme2signal.model.Materiel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class PdfGeneratorRunner implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        Map<String, Object> data = new HashMap<>();

        List<Materiel> materiels = new ArrayList<>();

        Materiel materiel1 = new Materiel(1, "C42", "Ordinateur");
        Materiel materiel2 = new Materiel(2, "C42", "Ordinateur");
        Materiel materiel3 = new Materiel(3, "C42", "Tablette");

        materiels.add(materiel1);
        materiels.add(materiel2);
        materiels.add(materiel3);

        data.put("materiels", materiels);

        data.put("salle", "C42");

        PdfGenerateServiceImpl pdfGenerateService = new PdfGenerateServiceImpl();

        pdfGenerateService.generatePdfFile("ListeQrCodeSalle", data, "qrcode-C42.pdf");
    }
}
