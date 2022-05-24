package fr.iut.nantes.flashme2signal;

import com.google.zxing.WriterException;
import fr.iut.nantes.flashme2signal.QRCode.QRCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class Flashme2signalApplication {

	public static void main(String[] args) {

		try {
			QRCodeGenerator.generateQR("www.site.fr");
		} catch (WriterException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		SpringApplication.run(Flashme2signalApplication.class, args);

	}

}