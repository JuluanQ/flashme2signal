package fr.iut.nantes.flashme2signal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Flashme2signalApplication {

	public static void main(String[] args) {

		try {
			QRCodeGenerator qr = new QRCodeGenerator();
			qr.generateQR("www.site.fr", "C02_5");
		} catch (WriterException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		SpringApplication.run(Flashme2signalApplication.class, args);

	}

}