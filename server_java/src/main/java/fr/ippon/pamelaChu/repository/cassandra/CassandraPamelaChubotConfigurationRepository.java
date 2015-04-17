package fr.ippon.pamelaChu.repository.cassandra;

import fr.ippon.pamelaChu.bot.config.PamelaChubotConfiguration;
import fr.ippon.pamelaChu.repository.PamelaChubotConfigurationRepository;
import me.prettyprint.cassandra.serializers.StringSerializer;
import me.prettyprint.cassandra.serializers.UUIDSerializer;
import me.prettyprint.cassandra.utils.TimeUUIDUtils;
import me.prettyprint.hector.api.Keyspace;
import me.prettyprint.hector.api.beans.ColumnSlice;
import me.prettyprint.hector.api.beans.HColumn;
import me.prettyprint.hector.api.factory.HFactory;
import me.prettyprint.hector.api.mutation.Mutator;
import me.prettyprint.hom.EntityManagerImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static fr.ippon.pamelaChu.config.ColumnFamilyKeys.DOMAIN_PAMELACHUBOT_CF;
import static me.prettyprint.hector.api.factory.HFactory.createSliceQuery;

/**
 * Cassandra implementation of CassandraPamelaChubotConfigurationRepository.
 * <p/>
 * <p/>
 * This uses two CF
 * <p/>
 * DomainPamelaChubot :
 * - Key : domain
 * - Name : PamelaChubotConfiguration Id
 * - Value : ""
 * <p/>
 * PamelaChubotConfiguration, managed by Hector Object Mapper
 * - Key : PamelaChubot Id
 * - Name : Key
 * - Value : Value
 *
 * @author Julien Dubois
 */
@Repository
public class CassandraPamelaChubotConfigurationRepository implements PamelaChubotConfigurationRepository {

    private final Logger log = LoggerFactory.getLogger(CassandraPamelaChubotConfigurationRepository.class);

    @Inject
    private Keyspace keyspaceOperator;

    @Inject
    private EntityManagerImpl em;

    @Override
    public void insertPamelaChubotConfiguration(PamelaChubotConfiguration pamelaChubotConfiguration) {
        UUID pamelaChubotConfigurationId = TimeUUIDUtils.getUniqueTimeUUIDinMillis();
        Mutator<String> mutator = HFactory.createMutator(keyspaceOperator, StringSerializer.get());
        mutator.insert(
                pamelaChubotConfiguration.getDomain(),
                DOMAIN_PAMELACHUBOT_CF,
                HFactory.createColumn(
                        pamelaChubotConfigurationId,
                        "",
                        UUIDSerializer.get(),
                        StringSerializer.get()));

        pamelaChubotConfiguration.setPamelaChubotConfigurationId(pamelaChubotConfigurationId.toString());
        em.persist(pamelaChubotConfiguration);
    }

    @Override
    public void updatePamelaChubotConfiguration(PamelaChubotConfiguration pamelaChubotConfiguration) {
        em.persist(pamelaChubotConfiguration);
    }

    @Override
    public PamelaChubotConfiguration findPamelaChubotConfigurationById(String pamelaChubotConfigurationId) {
        return em.find(PamelaChubotConfiguration.class, pamelaChubotConfigurationId);
    }

    @Override
    public Collection<PamelaChubotConfiguration> findPamelaChubotConfigurationsByDomain(String domain) {

        Set<PamelaChubotConfiguration> configurations = new HashSet<PamelaChubotConfiguration>();

        ColumnSlice<UUID, String> results = createSliceQuery(keyspaceOperator,
                StringSerializer.get(), UUIDSerializer.get(), StringSerializer.get())
                .setColumnFamily(DOMAIN_PAMELACHUBOT_CF)
                .setKey(domain)
                .setRange(null, null, false, Integer.MAX_VALUE)
                .execute()
                .get();

        for (HColumn<UUID, String> column : results.getColumns()) {
            String pamelaChubotConfigurationId = column.getName().toString();
            PamelaChubotConfiguration configuration = em.find(PamelaChubotConfiguration.class, pamelaChubotConfigurationId);
            configurations.add(configuration);
        }
        return configurations;
    }
}
