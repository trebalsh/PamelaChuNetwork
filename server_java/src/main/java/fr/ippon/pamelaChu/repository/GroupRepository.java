package fr.ippon.pamelaChu.repository;

import fr.ippon.pamelaChu.domain.Group;

/**
 * The Group Repository.
 *
 * @author Julien Dubois
 */
public interface GroupRepository {

    String createGroup(String domain);

    Group getGroupById(String domain, String groupId);
}
