package fr.ippon.pamelaChu.bot;

import fr.ippon.pamelaChu.bot.config.PamelaChubotConfiguration;
import fr.ippon.pamelaChu.bot.processor.LastUpdateDatePamelaChubotConfigurationUpdater;
import fr.ippon.pamelaChu.bot.processor.PamelaChuStatusProcessor;
import fr.ippon.pamelaChu.bot.route.CommonRouteBuilder;
import fr.ippon.pamelaChu.domain.Domain;
import fr.ippon.pamelaChu.domain.User;
import fr.ippon.pamelaChu.repository.DomainRepository;
import fr.ippon.pamelaChu.repository.PamelaChubotConfigurationRepository;
import fr.ippon.pamelaChu.service.StatusUpdateService;
import fr.ippon.pamelaChu.service.UserService;
import fr.ippon.pamelaChu.test.MockUtils;
import org.apache.camel.Route;
import org.apache.camel.model.FromDefinition;
import org.apache.camel.model.RouteDefinition;
import org.apache.camel.processor.idempotent.MemoryIdempotentRepository;
import org.apache.camel.test.junit4.CamelTestSupport;
import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.mockito.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.concurrent.Callable;

import static com.google.common.collect.Sets.newHashSet;
import static com.jayway.awaitility.Awaitility.await;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.Mockito.*;

public class PamelaChubotTest extends CamelTestSupport {

    private static final Logger log = LoggerFactory.getLogger(PamelaChubotTest.class);

    @Mock
    private DomainRepository domainRepository;

    @Mock
    private PamelaChubotConfigurationRepository pamelaChubotConfigurationRepository;

    @Mock
    private UserService userService;

    @Mock
    private StatusUpdateService statusUpdateService;

    @InjectMocks
    private PamelaChubot bot;

    @InjectMocks
    private PamelaChuStatusProcessor processor; // real one here ...

    @InjectMocks
    private LastUpdateDatePamelaChubotConfigurationUpdater lastUpdateDatePamelaChubotConfigurationUpdater;

    private CommonRouteBuilder commonRouteBuilder;

    User pamelaChubotUser = new User();

    private MemoryIdempotentRepository idempotentRepository;


    @Before
    public void setup() throws Exception {

        idempotentRepository = new MemoryIdempotentRepository();
        processor = new PamelaChuStatusProcessor();
        lastUpdateDatePamelaChubotConfigurationUpdater = new LastUpdateDatePamelaChubotConfigurationUpdater();
        bot = new PamelaChubot();
        MockitoAnnotations.initMocks(this); // init bot and processor with mock dependency
        ReflectionTestUtils.setField(bot, "idempotentRepository", idempotentRepository);

        commonRouteBuilder = new CommonRouteBuilder();
        ReflectionTestUtils.setField(commonRouteBuilder, "pamelaChuStatusProcessor", processor);
        ReflectionTestUtils.setField(commonRouteBuilder, "lastUpdateDatePamelaChubotConfigurationUpdater", lastUpdateDatePamelaChubotConfigurationUpdater);

        // common mock configuration :
        when(userService.getUserByLogin("pamelaChubot@ippon.fr")).thenReturn(pamelaChubotUser);
        when(pamelaChubotConfigurationRepository.findPamelaChubotConfigurationById(Mockito.anyString())).thenReturn(new PamelaChubotConfiguration());
    }

    @Test
    public void testRssRouteOnly() throws Exception {

        PamelaChubotConfiguration configuration = getRssBotConfiguration();
        configuration.setTag("BlogIppon");  // <<<  ==== TAG 

        setupAndLaunchContext(configuration);

        await().until(statusUpdateServiceWasCallAtLeast3Times());

        String msg1 = "[Ippevent Mobilité – Applications mobiles – ouverture des inscriptions](http://feedproxy.google.com/~r/LeBlogDesExpertsJ2ee/~3/GcJYERHTfoQ/)";
        String msg2 = "[Business – Ippon Technologies acquiert Atomes et renforce son offre Cloud](http://feedproxy.google.com/~r/LeBlogDesExpertsJ2ee/~3/wK-Y47WGZBQ/)";
        String msg3 = "[Les Méthodes Agiles – Définition de l’Agilité](http://feedproxy.google.com/~r/LeBlogDesExpertsJ2ee/~3/hSqyt1MCOoo/)";

        verify(statusUpdateService).postStatusAsUser(msg1 + " #BlogIppon", pamelaChubotUser);
        verify(statusUpdateService).postStatusAsUser(msg2 + " #BlogIppon", pamelaChubotUser);
        verify(statusUpdateService).postStatusAsUser(msg3 + " #BlogIppon", pamelaChubotUser);
        verifyNoMoreInteractions(statusUpdateService);

        // TODO : the repository is updated three times ... 
        ArgumentCaptor<PamelaChubotConfiguration> argumentCaptor = ArgumentCaptor.forClass(PamelaChubotConfiguration.class);
        verify(pamelaChubotConfigurationRepository, times(3)).updatePamelaChubotConfiguration(argumentCaptor.capture());
        PamelaChubotConfiguration value = argumentCaptor.getValue();
        assertThat(value.getLastUpdateDate(), is(DateTime.parse("2012-12-17T17:35:51Z").toDate()));

        assertTrue(idempotentRepository.contains("ippon.fr-" + msg1));
    }

    private Callable<Boolean> statusUpdateServiceWasCallAtLeast3Times() {
        return MockUtils.mockCalledCallable(statusUpdateService, 3);
    }

    @Override
    public boolean isUseAdviceWith() {
        return true; // returning true here to force CamelTestSupport NOT to start camel context
    }

    private void setupAndLaunchContext(PamelaChubotConfiguration configuration) throws Exception {
        Domain domain = new Domain();
        domain.setName("ippon.fr");

        when(domainRepository.getAllDomains()).thenReturn(newHashSet(domain));
        when(pamelaChubotConfigurationRepository.findPamelaChubotConfigurationsByDomain("ippon.fr")).thenReturn(newHashSet(configuration));

        // Note : we have to configure the context ourself as the mocks are used during route creation ..  
        context.addRoutes(commonRouteBuilder);
        context.addRoutes(bot);

        // Fix initial delay to speed up tests by 1s
        for (RouteDefinition routeDefinition : context.getRouteDefinitions()) {
            for (FromDefinition fromDefinition : routeDefinition.getInputs()) {
                String uri = fromDefinition.getUri();
                if (uri.startsWith("rss:")) {
                    fromDefinition.setUri(uri + "&consumer.initialDelay=0");
                }
            }
        }

        context.start();

        List<Route> routes = context.getRoutes();
        assertThat(routes, hasSize(2));
//        assertThat(routes.get(0).get, hasItems());
    }


    private PamelaChubotConfiguration getRssBotConfiguration() {
        final String fileUrl = this.getClass().getResource("route/rss.xml").toExternalForm();

        PamelaChubotConfiguration configuration = new PamelaChubotConfiguration();
        configuration.setPamelaChubotConfigurationId("TEST_CONFIG_ID");
        configuration.setType(PamelaChubotConfiguration.PamelaChubotType.RSS);
        configuration.setDomain("ippon.fr");
//        configuration.setUrl("http://feeds.feedburner.com/LeBlogDesExpertsJ2ee?format=xml");
        configuration.setUrl(fileUrl);
        configuration.setPollingDelay(60); // not used here
        configuration.setLastUpdateDate(DateTime.parse("2010-01-01T00:00:00").toDate());
        return configuration;
    }
}
