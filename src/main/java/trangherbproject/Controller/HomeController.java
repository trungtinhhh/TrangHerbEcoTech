package trangherbproject.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import trangherbproject.Model.Page;

import java.util.ArrayList;
import java.util.List;

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
    public String guidePage(Model model) {
        List<Page> pages = new ArrayList<>();
        pages.add(new Page("Front 1", "Back 1"));
        pages.add(new Page("Front 2", "Back 2"));
        pages.add(new Page("Front 3", "Back 3"));

        model.addAttribute("pages", pages);
        return "guidePage"; // guidePage.html trong resources/templates
    }

}
