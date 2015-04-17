package fr.ippon.pamelaChu.repository;

import fr.ippon.pamelaChu.bot.config.PamelaChubotConfiguration;

import java.util.Collection;

/**
 * The PamelaChu Bot configuration Repository.
 *
 * @author Julien Dubois
 */
public interface PamelaChubotConfigurationRepository {

    void insertPamelaChubotConfiguration(PamelaChubotConfiguration pamelaChubotConfiguration);

    void updatePamelaChubotConfiguration(PamelaChubotConfiguration pamelaChubotConfiguration);

    PamelaChubotConfiguration findPamelaChubotConfigurationById(String pamelaChubotConfigurationId);

    Collection<PamelaChubotConfiguration> findPamelaChubotConfigurationsByDomain(String domain);
}
