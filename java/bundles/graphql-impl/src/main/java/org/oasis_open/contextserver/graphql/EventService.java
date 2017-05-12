package org.oasis_open.contextserver.graphql;

/**
 * Created by loom on 04.05.17.
 */
public interface EventService {
    public RelayConnection<Event> findEvents(long first, String after, long last, String before);
}
