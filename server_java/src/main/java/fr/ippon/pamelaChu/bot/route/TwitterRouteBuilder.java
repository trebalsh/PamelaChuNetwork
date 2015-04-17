package fr.ippon.pamelaChu.bot.route;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//@Component ==> disabling component scanning as we create instances of this builder programmatically
public class TwitterRouteBuilder extends SourceRouteBuilderBase {

    private static final Logger log = LoggerFactory.getLogger(TwitterRouteBuilder.class);

    @Override
    public void configure() {

        log.debug("Configuring a Twitter support for domain {}", configuration.getDomain());

        from(getTwitterEndpointUri()).
                id("twitter-" + configuration.getDomain()).
                setHeader("login", simple(pamelaChuBotLogin)).
                setHeader("pamelaChubotConfiguration", constant(configuration)).
                // extraction of publishedDate ?
//            setHeader("pamelaChubotLastUpdateDate", simple("xxxx")). 
                        idempotentConsumer(simple("${header.pamelaChubotConfiguration.domain}-${body}"), idempotentRepository).
                to("direct:toPamelaChu");
    }

    String getTwitterEndpointUri() {

        // TODO : add a map field to PamelaChubotConfiguration ?
        String twitterUser = "?";
        String twitterConsumerKey = "?";
        String twitterConsumerSecret = "?";
        String twitterAccessToken = "?";
        String twitterAccessTokenSecret = "?";

        String twitterEndpointUrl = "twitter://timeline/user?user=" +
                twitterUser +
                "&type=polling&delay=60&consumerKey=" +
                twitterConsumerKey +
                "&consumerSecret=" +
                twitterConsumerSecret +
                "&accessToken=" +
                twitterAccessToken +
                "&accessTokenSecret=" +
                twitterAccessTokenSecret;

        return twitterEndpointUrl;
    }

}
