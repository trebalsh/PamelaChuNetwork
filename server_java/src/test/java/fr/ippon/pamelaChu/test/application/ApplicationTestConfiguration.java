package fr.ippon.pamelaChu.test.application;

import fr.ippon.pamelaChu.config.AsyncConfiguration;
import fr.ippon.pamelaChu.config.CassandraConfiguration;
import fr.ippon.pamelaChu.config.MailConfiguration;
import fr.ippon.pamelaChu.config.SearchConfiguration;
import org.apache.thrift.transport.TTransportException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.*;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Configuration
@PropertySource("classpath:/pamelaChu/pamelaChu-test.properties")
@ComponentScan(basePackages = {"fr.ippon.pamelaChu.repository", "fr.ippon.pamelaChu.service", "fr.ippon.pamelaChu.security"})
@Import(value = {AsyncConfiguration.class,
        CassandraConfiguration.class,
        SearchConfiguration.class,
        MailConfiguration.class})
@ImportResource({"classpath:META-INF/spring/applicationContext-security.xml"})
public class ApplicationTestConfiguration {

    private final Logger log = LoggerFactory.getLogger(ApplicationTestConfiguration.class);

    @PostConstruct
    public void initPamelaChu() throws IOException, TTransportException {
        this.log.info("PamelaChu test context started!");
    }
}
