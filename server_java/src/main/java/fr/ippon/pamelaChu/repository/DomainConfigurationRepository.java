package fr.ippon.pamelaChu.repository;

import fr.ippon.pamelaChu.domain.DomainConfiguration;

/**
 * The DomainConfiguraiton Repository.
 *
 * @author Julien Dubois
 */
public interface DomainConfigurationRepository {

    void updateDomainConfiguration(DomainConfiguration domainConfiguration);

    DomainConfiguration findDomainConfigurationByDomain(String domain);
}
