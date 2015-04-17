package fr.ippon.pamelaChu.bot.route;

import com.google.common.base.Strings;
import fr.ippon.pamelaChu.bot.config.PamelaChubotConfiguration;
import fr.ippon.pamelaChu.bot.processor.LastUpdateDatePamelaChubotConfigurationUpdater;
import fr.ippon.pamelaChu.bot.processor.PamelaChuStatusProcessor;
import org.apache.camel.Body;
import org.apache.camel.Header;
import org.apache.camel.builder.RouteBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component // This one IS a component as it is a singleton 
public class CommonRouteBuilder extends RouteBuilder {

    private static final Logger log = LoggerFactory.getLogger(CommonRouteBuilder.class);

    @Inject
    private PamelaChuStatusProcessor pamelaChuStatusProcessor;

    @Inject
    private LastUpdateDatePamelaChubotConfigurationUpdater lastUpdateDatePamelaChubotConfigurationUpdater;

    @Override
    public void configure() {

        // Final endpoint used to send status to PamelaChu : 

        from("direct:toPamelaChu"). // TODO : switch from direct: endpoint to an asynchronous one : seda: or jms: (for throttling in particular)
                bean(new TagAppender()).
                bean(pamelaChuStatusProcessor).
                bean(lastUpdateDatePamelaChubotConfigurationUpdater);

    }

    public static class TagAppender {
        public String process(@Body String body, @Header("pamelaChubotConfiguration") PamelaChubotConfiguration configuration) throws Exception {
            if (!Strings.isNullOrEmpty(configuration.getTag())) {
                body = body + " #" + configuration.getTag();
            }
            return body;
        }
    }

}
