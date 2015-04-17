package fr.ippon.pamelaChu.repository;

import fr.ippon.pamelaChu.domain.Avatar;

public interface AvatarRepository {

    void createAvatar(Avatar avatar);

    void removeAvatar(String avatarId);

    Avatar findAvatarById(String avatarId);

}
