package trangherbproject.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;

@Controller
public class HomeController {

    @GetMapping("/")
    public String homePage(Model model) {
        model.addAttribute("currentPage", "home");
        return "homePage";
    };

    @GetMapping("/products")
    public String productsPage(Model model) {
        model.addAttribute("currentPage", "products");
        return "productsPage";
    }

    @GetMapping("/technology")
    public String technologyPage(Model model) {
        model.addAttribute("currentPage", "technology");
        return "technologyPage";
    }

    @GetMapping("/about")
    public String aboutPage(Model model) {
        model.addAttribute("currentPage", "about");
        return "aboutPage";
    }

    @GetMapping("/contact")
    public String contactPage(Model model) {
        model.addAttribute("currentPage", "contact");
        return "contactPage";
    }

    @GetMapping("/guide")
    public String guidePage(Model model) throws IOException {
        model.addAttribute("currentPage", "guide");
        return "guidePage";
    }
}