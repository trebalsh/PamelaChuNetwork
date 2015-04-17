package fr.ippon.pamelaChu.repository;

public interface AppleDeviceUserRepository {

    void createAppleDeviceForUser(String deviceId, String login);

    void removeAppleDeviceForUser(String deviceId);

    String findLoginForDeviceId(String deviceId);

}
