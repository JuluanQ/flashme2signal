package fr.iut.nantes.flashme2signal;

import fr.iut.nantes.flashme2signal.model.Materiel;
import fr.iut.nantes.flashme2signal.utils.PdfGenerator.PdfGenerateService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class Flashme2signalApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Flashme2signalApplication.class);
	}

	public static void main(String[] args) throws Exception {

		SpringApplication.run(Flashme2signalApplication.class, args);
	}

}