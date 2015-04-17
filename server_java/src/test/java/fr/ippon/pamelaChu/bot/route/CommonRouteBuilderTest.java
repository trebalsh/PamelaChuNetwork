package fr.ippon.pamelaChu.bot.route;

import fr.ippon.pamelaChu.bot.config.PamelaChubotConfiguration;
import fr.ippon.pamelaChu.bot.processor.LastUpdateDatePamelaChubotConfigurationUpdater;
import fr.ippon.pamelaChu.bot.processor.PamelaChuStatusProcessor;
import fr.ippon.pamelaChu.test.MockUtils;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.test.junit4.CamelTestSupport;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;

import static com.jayway.awaitility.Awaitility.await;
import static org.mockito.Mockito.verify;

public class CommonRouteBuilderTest extends CamelTestSupport {

    private static final Logger log = LoggerFactory.getLogger(CommonRouteBuilderTest.class);

    private static Date value = new Date();

    @Mock
    private PamelaChuStatusProcessor pamelaChuStatusProcessor;

    @Mock
    private LastUpdateDatePamelaChubotConfigurationUpdater lastUpdateDatePamelaChubotConfigurationUpdater;

    @InjectMocks
    private CommonRouteBuilder sut;

    @Override
    // Called during @Before handling of the super class ...
    protected RouteBuilder createRouteBuilder() throws Exception {
        MockitoAnnotations.initMocks(this);

        return sut;
    }

    @Test
    public void commonRouteSendStatusAndUpdateConfiguration() throws Exception {
        PamelaChubotConfiguration configuration = new PamelaChubotConfiguration();
        configuration.setTag("MyTag");

        sendAMessage(configuration);

        await().until(lastProcessorWasCalled());

        verify(pamelaChuStatusProcessor).sendStatus("The content #MyTag", "bot@ippon.fr");
        verify(lastUpdateDatePamelaChubotConfigurationUpdater).updateLastDate(value, configuration);

    }

    @Test
    public void commonRouteShouldAddTagIfPresent() throws Exception {
        PamelaChubotConfiguration configuration = new PamelaChubotConfiguration();
        configuration.setTag("MyTag");

        sendAMessage(configuration);

        await().until(lastProcessorWasCalled());

        verify(pamelaChuStatusProcessor).sendStatus("The content #MyTag", "bot@ippon.fr");
    }


    @Test
    public void commonRouteDoesNotModifyMessageIfTagIsAbsent() throws Exception {
        PamelaChubotConfiguration configuration = new PamelaChubotConfiguration();

        sendAMessage(configuration);

        await().until(lastProcessorWasCalled());

        verify(pamelaChuStatusProcessor).sendStatus("The content", "bot@ippon.fr");
    }

    private void sendAMessage(PamelaChubotConfiguration configuration) {
        Map<String, Object> headers = new HashMap<String, Object>();
        headers.put("pamelaChubotConfiguration", configuration);
        headers.put("login", "bot@ippon.fr");
        headers.put("pamelaChubotLastUpdateDate", value);
        template.sendBodyAndHeaders("direct:toPamelaChu", "The content", headers);
    }

    private Callable<Boolean> lastProcessorWasCalled() {
//        return MockUtils.mockCalledCallable(pamelaChuStatusProcessor, 1);
        return MockUtils.mockCalledCallable(lastUpdateDatePamelaChubotConfigurationUpdater, 1);
    }

}
