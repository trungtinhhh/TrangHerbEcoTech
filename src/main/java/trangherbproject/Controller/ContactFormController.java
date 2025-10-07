package trangherbproject.Controller;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import trangherbproject.DTO.ContactFormDTO;

@Controller
public class ContactFormController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @PostMapping("/support")
    public String sendContact(@ModelAttribute ContactFormDTO form, RedirectAttributes redirectAttributes) {
        try {
            Context context = new Context();
            context.setVariable("fullname", form.getFullname());
            context.setVariable("phone", form.getPhone());
            context.setVariable("email", form.getEmail());
            context.setVariable("message", form.getMessage());

            String htmlContent = templateEngine.process("emailContact/emailContact", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo("therbecotech.new@gmail.com");
            helper.setSubject("Liên hệ tư vấn mới từ TrangHerb EcoTech");
            helper.setText(htmlContent, true);
            helper.setFrom("noreply.trangherb@gmail.com");

            mailSender.send(message);

            redirectAttributes.addFlashAttribute("success", true);
        } catch (MessagingException e) {
            redirectAttributes.addFlashAttribute("error", "Không thể gửi mail: " + e.getMessage());
        }

        return "redirect:/";
    }
}
