package trangherbproject.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String homePage() {
        return "homePage";
    };

    @GetMapping("/products")
    public String productsPage() {
        return "productsPage";
    }

    @GetMapping("/technology")
    public String technologyPage() {
        return "technologyPage";
    }

    @GetMapping("/about")
    public String aboutPage() {
        return "aboutPage";
    }

    @GetMapping("/contact")
    public String contactPage() {
        return "contactPage";
    }

    @GetMapping("/guide")
    public String guidePage() {
        return "guidePage";
    }
}
