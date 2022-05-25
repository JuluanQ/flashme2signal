package fr.iut.nantes.flashme2signal;

import com.google.zxing.WriterException;
import fr.iut.nantes.flashme2signal.QRCode.QRCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class Flashme2signalApplication {

	public static void main(String[] args) {

		SpringApplication.run(Flashme2signalApplication.class, args);

	}

}