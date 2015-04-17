package fr.ippon.pamelaChu.service.elasticsearch;

import org.elasticsearch.client.Client;

/**
 * Elasticsearch engine.
 */
public interface ElasticsearchEngine {

    /**
     * @return Elasticsearch client.
     */
    Client client();
}
