package fr.ippon.pamelaChu.repository;

import fr.ippon.pamelaChu.domain.Group;

/**
 * The Group Details Repository.
 *
 * @author Julien Dubois
 */
public interface GroupDetailsRepository {

    void createGroupDetails(String groupId, String name, String description, boolean publicGroup);

    Group getGroupDetails(String groupId);

    void editGroupDetails(String groupId, String name, String description, boolean archivedGroup);
}
