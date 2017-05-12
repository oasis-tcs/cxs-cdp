package org.oasis_open.contextserver.graphql;

import java.util.List;

/**
 * Created by loom on 04.05.17.
 */
public interface EventService {
    public RelayConnection<Event> findEvents(CXSFilterFunction cxsFilterFunction, List<CXSOrderBy> orderBys, long first, String after, long last, String before);
}
