package fr.ippon.pamelaChu.bot.processor;

import fr.ippon.pamelaChu.bot.config.PamelaChubotConfiguration;
import fr.ippon.pamelaChu.repository.PamelaChubotConfigurationRepository;
import org.apache.camel.Header;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.Date;

@Component
public class LastUpdateDatePamelaChubotConfigurationUpdater {

    @Inject
    private PamelaChubotConfigurationRepository pamelaChubotConfigurationRepository;

    public void updateLastDate(@Header("pamelaChubotLastUpdateDate") Date lastUpdateDate,
                               @Header("pamelaChubotConfiguration") PamelaChubotConfiguration pamelaChubotConfigurationUsedByRoute) {

        String pamelaChubotConfigurationId = pamelaChubotConfigurationUsedByRoute.getPamelaChubotConfigurationId();

        PamelaChubotConfiguration lastPamelaChubotConfiguration = pamelaChubotConfigurationRepository
                .findPamelaChubotConfigurationById(pamelaChubotConfigurationId);

        lastPamelaChubotConfiguration.setLastUpdateDate(lastUpdateDate);
        pamelaChubotConfigurationRepository.updatePamelaChubotConfiguration(lastPamelaChubotConfiguration);
    }

}
