package trangherbproject.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import trangherbproject.Model.Page;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

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

    private String readHtmlFile(String path) throws IOException {
        try (InputStream is = getClass().getResourceAsStream(path)) {
            if (is == null) {
                throw new IOException("Không tìm thấy file: " + path);
            }
            String content = new String(is.readAllBytes(), StandardCharsets.UTF_8);

            // Thêm marker để debug
            content = "<!-- DEBUG: " + path + " -->" + content;
            content = content.replaceAll("th:src=\"@\\{([^}]+)\\}\"", "src=\"$1\"");

            return content;
        }
    }

    @GetMapping("/guide")
    public String guidePage(Model model) throws IOException {
        model.addAttribute("currentPage", "guide");

        List<Page> pages = new ArrayList<>();

        // Định nghĩa danh sách file theo đúng thứ tự hiển thị
        String[][] files = {
                {"AnhBia.html", "MucLuc.html"},
                {"Page1.html", "Page2.html"},
                {"Page3.html", "Page4.html"},
                {"Page5.html", "Page6.html"},
                {"Page7.html", "Page8.html"},
                {"Page9.html", "Page10.html"},
                {"Page11.html", "Page12.html"},
                {"Page13.html", "Page14.html"},
                {"Page15.html", "Page16.html"},
        };

        for (int i = 0; i < files.length; i++) {
            String[] pair = files[i];
            String front = readHtmlFile("/templates/guide/" + pair[0]);
            String back = readHtmlFile("/templates/guide/" + pair[1]);
            pages.add(new Page(front, back));
        }

        model.addAttribute("pages", pages);
        return "guidePage"; // view Thymeleaf
    }
}