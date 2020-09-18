package fr.ippon.pamelaChu.service.util;

import org.apache.commons.lang.RandomStringUtils;

import java.security.SecureRandom;

/**
 * Utility class for generating random Strings.
 *
 * @author Julien Dubois
 */
public class RandomUtil {
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    static {
        SECURE_RANDOM.nextBytes(new byte[64]);
    }

    private RandomUtil() {
    }

    private static String generateRandomAlphanumericString() {
        return RandomStringUtils.random(DEF_COUNT, 0, 0, true, true, null, SECURE_RANDOM);
    }

    public static String generatePassword() {
        return generateRandomAlphanumericString();
    }

    public static String generateRegistrationKey() {
        return generateRandomAlphanumericString();
    }
}
