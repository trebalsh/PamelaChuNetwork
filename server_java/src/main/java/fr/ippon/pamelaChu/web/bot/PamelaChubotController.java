package fr.ippon.pamelaChu.web.bot;

import fr.ippon.pamelaChu.bot.config.PamelaChubotConfiguration;
import fr.ippon.pamelaChu.domain.User;
import fr.ippon.pamelaChu.repository.PamelaChubotConfigurationRepository;
import fr.ippon.pamelaChu.security.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.Collection;

/**
 * @author Julien Dubois
 */
@Controller
public class PamelaChubotController {

    private final Logger log = LoggerFactory.getLogger(PamelaChubotController.class);

    @Inject
    private PamelaChubotConfigurationRepository pamelaChubotConfigurationRepository;

    @Inject
    private AuthenticationService authenticationService;

    @RequestMapping(value = "/rest/pamelaChubot/configurations",
            method = RequestMethod.GET,
            produces = "application/json")
    @ResponseBody
    public Collection<PamelaChubotConfiguration> getConfigurations() {
        User currentUser = authenticationService.getCurrentUser();
        return pamelaChubotConfigurationRepository.findPamelaChubotConfigurationsByDomain(currentUser.getDomain());
    }
}
