package fr.ippon.pamelaChu.repository;

import fr.ippon.pamelaChu.domain.Group;
import fr.ippon.pamelaChu.domain.status.*;

import javax.validation.ConstraintViolationException;
import java.util.Collection;

/**
 * The Status Repository.
 *
 * @author Julien Dubois
 */
public interface StatusRepository {

    Status createStatus(String login,
                        boolean statusPrivate,
                        Group group,
                        Collection<String> attachmentIds,
                        String content,
                        String discussionId,
                        String replyTo,
                        String replyToUsername,
                        String geoLocalization) throws ConstraintViolationException;

    Share createShare(String login,
                      String originalStatusId);

    Announcement createAnnouncement(String login,
                                    String originalStatusId);

    MentionFriend createMentionFriend(String login,
                                      String followerLogin);

    MentionShare createMentionShare(String login,
                                    String originalStatusId);

    void removeStatus(AbstractStatus status);

    /**
     * Retrieve a persisted status.
     *
     * @return null if status was removed
     */
    AbstractStatus findStatusById(String statusId);
}
