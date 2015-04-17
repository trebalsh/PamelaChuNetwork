package fr.ippon.pamelaChu.bot.processor;

import fr.ippon.pamelaChu.domain.User;
import fr.ippon.pamelaChu.service.StatusUpdateService;
import fr.ippon.pamelaChu.service.UserService;
import org.apache.camel.Body;
import org.apache.camel.Header;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component
public class PamelaChuStatusProcessor {

    private final Logger log = LoggerFactory.getLogger(PamelaChuStatusProcessor.class);

    @Inject
    private StatusUpdateService statusUpdateService;

    @Inject
    private UserService userService;

    public void sendStatus(@Body String content, @Header("login") String login) throws Exception {

        User pamelaChuBotUser = userService.getUserByLogin(login);

        log.debug("Posting content to PamelaChu : {}", content);


        // TODO : handle posting in group ...

        statusUpdateService.postStatusAsUser(content, pamelaChuBotUser);

    }
}
