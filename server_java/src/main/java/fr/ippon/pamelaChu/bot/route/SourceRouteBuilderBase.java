package fr.ippon.pamelaChu.bot.route;

import fr.ippon.pamelaChu.bot.config.PamelaChubotConfiguration;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.spi.IdempotentRepository;

public abstract class SourceRouteBuilderBase extends RouteBuilder {

    protected IdempotentRepository<String> idempotentRepository;
    protected PamelaChubotConfiguration configuration;
    protected String pamelaChuBotLogin;

    public SourceRouteBuilderBase() {
    }

    public IdempotentRepository<String> getIdempotentRepository() {
        return idempotentRepository;
    }

    public void setIdempotentRepository(IdempotentRepository<String> idempotentRepository) {
        this.idempotentRepository = idempotentRepository;
    }

    public PamelaChubotConfiguration getConfiguration() {
        return configuration;
    }

    public void setConfiguration(PamelaChubotConfiguration configuration) {
        this.configuration = configuration;
    }

    public String getPamelaChuBotLogin() {
        return pamelaChuBotLogin;
    }

    public void setPamelaChuBotLogin(String pamelaChuBotLogin) {
        this.pamelaChuBotLogin = pamelaChuBotLogin;
    }

}