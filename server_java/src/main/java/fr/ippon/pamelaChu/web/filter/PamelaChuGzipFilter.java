package fr.ippon.pamelaChu.web.filter;

import net.sf.ehcache.constructs.web.filter.GzipFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Provides GZIP compression of responses, based on ehcache's GzipFilter.
 */
public class PamelaChuGzipFilter extends GzipFilter {

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws Exception {

        if(request.getHeader("accept").equals("*/*")) {
            IeRefreshWrapper requestIE = new IeRefreshWrapper(request);
            chain.doFilter(requestIE, response);
        } else {
            //otherwise, continue on in the chain with the ServletRequest and ServletResponse objects
        	chain.doFilter(request, response);
        }       
        return;
    }
}
