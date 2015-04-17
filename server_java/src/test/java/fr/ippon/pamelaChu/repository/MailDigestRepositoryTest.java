package fr.ippon.pamelaChu.repository;

import fr.ippon.pamelaChu.AbstractCassandraPamelaChuTest;
import fr.ippon.pamelaChu.domain.DigestType;
import org.junit.Test;

import javax.inject.Inject;
import java.util.Calendar;
import java.util.List;

import static org.hamcrest.Matchers.notNullValue;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

/**
 * @author Pierre Rust
 */
public class MailDigestRepositoryTest extends AbstractCassandraPamelaChuTest {

    @Inject
    public MailDigestRepository mailDigestRepository;


    @Test
    public void shouldGetAUserRepositoryInjected() {
        assertThat(mailDigestRepository, notNullValue());
    }

    @Test
    public void shouldInsertWeeklySubscription() {

        log.debug("In shouldInsertWeeklySubscription");

        String login = "nuuser@ippon.fr";
        String domain = "ippon.fr";
        String day = String.valueOf(Calendar.getInstance().get(Calendar.DAY_OF_WEEK));

        mailDigestRepository.subscribeToDigest(DigestType.WEEKLY_DIGEST, login, domain, day);

        List<String> logins = mailDigestRepository.getLoginsRegisteredToDigest(DigestType.WEEKLY_DIGEST, domain, day, 0);
        assertThat(logins, notNullValue());
        assertTrue(logins.contains(login));

    }

    @Test
    public void shouldInsertDailySubscription() {
        log.debug("In shouldInsertDailySubscription");

        String login = "nuuser@ippon.fr";
        String domain = "ippon.fr";
        String day = String.valueOf(Calendar.getInstance().get(Calendar.DAY_OF_WEEK));


        mailDigestRepository.subscribeToDigest(DigestType.DAILY_DIGEST, login, domain, day);

        List<String> logins = mailDigestRepository.getLoginsRegisteredToDigest(DigestType.DAILY_DIGEST, domain, day, 0);
        assertThat(logins, notNullValue());
        assertTrue(logins.contains(login));

    }

    @Test
    public void shouldRemoveWeeklySubscription() {
        log.debug("In shouldRemoveWeeklySubscription");

        String login = "nuuser@ippon.fr";
        String domain = "ippon.fr";
        String day = String.valueOf(Calendar.getInstance().get(Calendar.DAY_OF_WEEK));

        mailDigestRepository.unsubscribeFromDigest(DigestType.WEEKLY_DIGEST, login, domain, day);

        List<String> logins = mailDigestRepository.getLoginsRegisteredToDigest(DigestType.WEEKLY_DIGEST, domain, day, 0);
        assertThat(logins, notNullValue());
        assertTrue(!logins.contains(login));

    }

    @Test
    public void shouldRemoveDailySubscription() {
        log.debug("In shouldRemoveDailySubscription");

        String login = "nuuser@ippon.fr";
        String domain = "ippon.fr";
        String day = String.valueOf(Calendar.getInstance().get(Calendar.DAY_OF_WEEK));

        mailDigestRepository.unsubscribeFromDigest(DigestType.DAILY_DIGEST, login, domain, day);

        List<String> logins = mailDigestRepository.getLoginsRegisteredToDigest(DigestType.DAILY_DIGEST, domain, day, 0);
        assertThat(logins, notNullValue());
        assertTrue(!logins.contains(login));

    }
}
