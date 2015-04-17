package fr.ippon.pamelaChu.config;

import org.apache.thrift.transport.TTransportException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.io.IOException;

@Configuration
@PropertySource({"classpath:/META-INF/pamelaChu/pamelaChu.properties",
        "classpath:/META-INF/pamelaChu/customization.properties"})
@ComponentScan(basePackages = {
        "fr.ippon.pamelaChu.repository",
        "fr.ippon.pamelaChu.service",
        "fr.ippon.pamelaChu.security"})
@Import(value = {
        AsyncConfiguration.class,
        CacheConfiguration.class,
        CassandraConfiguration.class,
        SearchConfiguration.class,
        MailConfiguration.class,
        MetricsConfiguration.class})
@ImportResource("classpath:META-INF/spring/applicationContext-*.xml")
public class ApplicationConfiguration {

    private final Logger log = LoggerFactory.getLogger(ApplicationConfiguration.class);

    @Inject
    private Environment env;

    /**
     * Initializes PamelaChu.
     * <p/>
     * Spring profiles can be configured with a system property -Dspring.profiles.active=your-active-profile
     * <p/>
     * Available profiles are :
     * - "apple-push" : for enabling Apple Push notifications
     * - "metrics" : for enabling Yammer Metrics
     * - "pamelaChubot" : for enabling the PamelaChu bot
     */
    @PostConstruct
    public void initPamelaChu() throws IOException, TTransportException {
        log.debug("Looking for Spring profiles... Available profiles are \"metrics\", \"pamelaChubot\" and \"apple-push\"");
        if (env.getActiveProfiles().length == 0) {
            log.debug("No Spring profile configured, running with default configuration");
        } else {
            for (String profile : env.getActiveProfiles()) {
                log.debug("Detected Spring profile : " + profile);
            }
        }
        Constants.VERSION = env.getRequiredProperty("pamelaChu.version");
        Constants.GOOGLE_ANALYTICS_KEY = env.getProperty("pamelaChu.google.analytics.key");
        if ("true".equals(env.getProperty("pamelaChu.wro4j.enabled"))) {
            Constants.WRO4J_ENABLED = true;
        }
        log.info("PamelaChu v. {} started!", Constants.VERSION);
        log.debug("Google Analytics key : {}", Constants.GOOGLE_ANALYTICS_KEY);
        log.debug("WRO4J enabled : {}", Constants.WRO4J_ENABLED);

    }
}
