package fr.ippon.pamelaChu.repository;

import fr.ippon.pamelaChu.domain.User;

import javax.validation.ConstraintViolationException;

/**
 * The User Repository.
 *
 * @author Julien Dubois
 */
public interface UserRepository {

    void createUser(User user);

    void updateUser(User user) throws ConstraintViolationException, IllegalArgumentException;

    void deleteUser(User user);

    void desactivateUser( User user );

    void reactivateUser( User user );

    User findUserByLogin(String login);
}
