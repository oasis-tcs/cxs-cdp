package org.oasis_open.contextserver.graphql.internal;

import org.oasis_open.contextserver.graphql.Event;
import org.oasis_open.contextserver.graphql.EventService;
import org.osgi.service.component.annotations.Component;

import java.util.*;

/**
 * Created by loom on 04.05.17.
 */
@Component(
        name="MockEventServiceImpl",
        immediate=true
)
public class MockEventServiceImpl implements EventService {

    private Map<String,Event> mockEventDatabase = new HashMap<String,Event>();

    public MockEventServiceImpl() {
        UUID.randomUUID().toString();

        Properties pageProperties = new Properties();
        pageProperties.put("pageId", UUID.randomUUID().toString());
        pageProperties.put("pagePath", "/cars/modelx");
        pageProperties.put("pageLanguage", "en");
        Event pageViewEvent = new Event(UUID.randomUUID().toString(), System.currentTimeMillis(), "pageView", "thomas-profile-id", "/cars/modelx", pageProperties);

        Properties buttonClickProperties = new Properties();
        buttonClickProperties.put("clickPositionX", "5");
        buttonClickProperties.put("clickPositionY", "7");
        buttonClickProperties.put("clickLengthMillis", "9");
        Event buttonClickEvent = new Event(UUID.randomUUID().toString(), System.currentTimeMillis(), "buttonClick", "thomas-profile-id", "/cars/modelx#buy", buttonClickProperties);
        mockEventDatabase.put(pageViewEvent.getId(), pageViewEvent);
        mockEventDatabase.put(buttonClickEvent.getId(), buttonClickEvent);
    }

    public List<Event> getEvents(long offset, long pageSize) {
        return new ArrayList<Event>(mockEventDatabase.values());
    }
}
