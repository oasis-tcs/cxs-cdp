package org.oasis_open.contextserver.graphql;

import java.util.List;

/**
 * Created by loom on 04.05.17.
 */
public interface EventService {
    public List<Event> getEvents(long offset, long pageSize);
}
