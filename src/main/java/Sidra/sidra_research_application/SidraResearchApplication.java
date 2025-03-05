package Sidra.sidra_research_application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping("/api")

public class SidraResearchApplication {


	public String welcome(){
		return "Sidra Application Demo + Azure Active Directory Authentication";
	}

	public static void main(String[] args) {
		SpringApplication.run(SidraResearchApplication.class, args);
	}

}
