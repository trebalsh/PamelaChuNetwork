package fr.ippon.pamelaChu.bot;

import fr.ippon.pamelaChu.bot.config.PamelaChubotConfiguration;
import fr.ippon.pamelaChu.bot.route.GitHubRouteBuilder;
import fr.ippon.pamelaChu.bot.route.RssRouteBuilder;
import fr.ippon.pamelaChu.bot.route.SourceRouteBuilderBase;
import fr.ippon.pamelaChu.bot.route.TwitterRouteBuilder;
import fr.ippon.pamelaChu.config.Constants;
import fr.ippon.pamelaChu.domain.Domain;
import fr.ippon.pamelaChu.repository.DomainRepository;
import fr.ippon.pamelaChu.repository.PamelaChubotConfigurationRepository;
import fr.ippon.pamelaChu.service.UserService;
import fr.ippon.pamelaChu.service.util.DomainUtil;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.spi.IdempotentRepository;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

/**
 * The PamelaChu Robot.
 */
@Component
public class PamelaChubot extends RouteBuilder {

    private static final Logger log = LoggerFactory.getLogger(PamelaChubot.class);


    @Inject
    private IdempotentRepository<String> idempotentRepository;

    @Inject
    private DomainRepository domainRepository;

    @Inject
    private PamelaChubotConfigurationRepository pamelaChubotConfigurationRepository;

    @Inject
    private UserService userService;

    @Override
    public void configure() {

        log.info("Configuring the PamelaChu Bot");
        for (Domain domain : domainRepository.getAllDomains()) {
            log.debug("Configuring Bot for domain {}", domain.getName());
            String pamelaChuBotLogin = getPamelaChuBotLogin(domain);

            for (PamelaChubotConfiguration configuration :
                    pamelaChubotConfigurationRepository.findPamelaChubotConfigurationsByDomain(domain.getName())) {

                log.debug("Configuring Bot : {}", configuration);


                SourceRouteBuilderBase subBuilder = null;
                if (configuration.getType().equals(PamelaChubotConfiguration.PamelaChubotType.RSS)) {
                    subBuilder = new RssRouteBuilder();

                } else if (configuration.getType().equals(PamelaChubotConfiguration.PamelaChubotType.TWITTER)) {
                    subBuilder = new TwitterRouteBuilder();

                } else if (configuration.getType().equals(PamelaChubotConfiguration.PamelaChubotType.GIT)) {
                    subBuilder = new GitHubRouteBuilder();
                }

                if (subBuilder != null) {
                    subBuilder.setConfiguration(configuration);
                    subBuilder.setPamelaChuBotLogin(pamelaChuBotLogin);
                    subBuilder.setIdempotentRepository(idempotentRepository);
                    addRoutesToContext(subBuilder);
                }
            }
        }
    }

    private void addRoutesToContext(RouteBuilder builder) {
        try {
            getContext().addRoutes(builder);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error when configuring a route", e);
        }
    }

    private String getPamelaChuBotLogin(Domain domain) {
        String pamelaChuBotLogin = DomainUtil.getLoginFromUsernameAndDomain(Constants.PAMELACHUBOT_NAME, domain.getName());
        automaticBotCreation(domain, pamelaChuBotLogin);
        return pamelaChuBotLogin;
    }

    private void automaticBotCreation(Domain domain, String pamelaChuBotLogin) {
        if (userService.getUserByLogin(pamelaChuBotLogin) == null) {
            log.info("PamelaChu Bot user does not exist for domain " + domain.getName() + " - creating it");
            userService.createPamelaChubot(domain.getName());
            if (domain.getName().equals("ippon.fr")) {
                log.info("Creating a default RSS robot for ippon.fr");
                PamelaChubotConfiguration configuration = new PamelaChubotConfiguration();
                configuration.setType(PamelaChubotConfiguration.PamelaChubotType.RSS);
                configuration.setDomain("ippon.fr");
                configuration.setUrl("http://feeds.feedburner.com/LeBlogDesExpertsJ2ee?format=xml");
                configuration.setPollingDelay(60);
                DateTime lastUpdateDate = DateTime.parse("2013-01-01T00:00:00");
                configuration.setLastUpdateDate(lastUpdateDate.toDate());
                configuration.setTag("BlogIppon");
                pamelaChubotConfigurationRepository.insertPamelaChubotConfiguration(configuration);
            }
        }
    }
}
