package org.oasis_open.contextserver.graphql.internal;

import org.oasis_open.contextserver.graphql.*;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * Created by loom on 04.05.17.
 */
@Component(
        name="MockEventServiceImpl",
        immediate=true
)
public class MockEventServiceImpl implements EventService {

    private static final Logger logger = LoggerFactory.getLogger(MockEventServiceImpl.class);

    private List<CXSEvent> mockEventDatabase = new ArrayList<CXSEvent>();

    private static final String[] BUTTON_NAMES = { "buy", "more"};

    private static final String[] PAGE_PATHS = { "/", "/cars", "/cars/model3", "/cars/modelx", "/cars/models" };

    private static final String[] PAGE_LANGUAGES = { "en", "fr", "no"};

    private static final String[] FILE_PATHS = { "/cars/overview.pdf", "/cars/model3/brochure.pdf", "/cars/modelx/brochure.pdf", "/cars/models/brochure.pdf" };

    private static final String[] PROFILE_IDS = { "thomas-profile-id", "serge-profile-id"};

    public MockEventServiceImpl() {
        Random randomizer = new Random(System.currentTimeMillis());

        logger.info("Generating mock event database...");
        for (int i=0; i < 10000; i++) {
            int eventType = randomizer.nextInt(3);
            CXSEvent cxsEvent = null;
            switch (eventType) {
                case 0:
                    cxsEvent = generatePageViewEvent(i, randomizer);
                    break;
                case 1:
                    cxsEvent = generateButtonClickEvent(i, randomizer);
                    break;
                case 2:
                    cxsEvent = generateDownloadEvent(i, randomizer);
                    break;
            }
            mockEventDatabase.add(cxsEvent);
        }
        logger.info("Generated {} mock events in database", mockEventDatabase.size());
    }

    public RelayConnection<CXSEvent> findEvents(CXSFilterFunction filterFunction, List<CXSOrderBy> orderBys, long first, String after, long last, String before) {
        List<RelayEdge<CXSEvent>> eventEdges = new ArrayList<RelayEdge<CXSEvent>>();
        long startPos = 0;
        long endPos = startPos + 10; // return 10 results by default
        if (after != null) {
            startPos = Long.parseLong(after);
            if (first > 0) {
                endPos = startPos + first;
            } else {
                endPos = startPos + 10;
            }
        } else if (before != null) {
            endPos = Long.parseLong(before);
            if (last > 0) {
                startPos = endPos - last;
            } else {
                startPos = endPos - 10;
            }
        }
        if (startPos < 0) startPos = 0;
        if (endPos < 0) endPos = 0;
        if (startPos >= mockEventDatabase.size()) startPos = mockEventDatabase.size() - 1;
        if (endPos > mockEventDatabase.size()) endPos = mockEventDatabase.size();
        for (long i = startPos; i < endPos; i++) {
            CXSEvent cxsEvent = mockEventDatabase.get((int)i);
            RelayEdge<CXSEvent> eventEdge = new RelayEdge<CXSEvent>(cxsEvent, cxsEvent.getId());
            eventEdges.add(eventEdge);
        }
        return new RelayConnection<CXSEvent>(eventEdges, new RelayPageInfo(startPos > 0, endPos < mockEventDatabase.size()));
    }

    private CXSEvent generatePageViewEvent(long eventId, Random random) {
        Properties pageProperties = new Properties();
        String pagePath = generateFromStringArray(PAGE_PATHS, random);
        pageProperties.put("pageId", pagePath.hashCode());
        pageProperties.put("pagePath", pagePath);
        pageProperties.put("pageLanguage", generateFromStringArray(PAGE_LANGUAGES, random));
        CXSEvent pageViewCXSEvent = new CXSEvent(
                Long.toString(eventId),
                System.currentTimeMillis(),
                "pageView",
                generateFromStringArray(PROFILE_IDS, random),
                pagePath,
                generateGeoPoint(random),
                pageProperties);
        return pageViewCXSEvent;
    }

    private CXSEvent generateButtonClickEvent(long eventId, Random random) {
        Properties buttonClickProperties = new Properties();
        String pagePath = generateFromStringArray(PAGE_PATHS, random);
        buttonClickProperties.put("clickPositionX", random.nextInt(100));
        buttonClickProperties.put("clickPositionY", random.nextInt(100));
        buttonClickProperties.put("clickLengthMillis", random.nextInt(100));
        CXSEvent buttonClickCXSEvent = new CXSEvent(
                Long.toString(eventId),
                System.currentTimeMillis(),
                "buttonClick",
                generateFromStringArray(PROFILE_IDS, random),
                pagePath + "#" + generateFromStringArray(BUTTON_NAMES, random),
                generateGeoPoint(random),
                buttonClickProperties);
        return buttonClickCXSEvent;
    }

    private CXSEvent generateDownloadEvent(long eventId, Random random) {
        Properties downloadProperties = new Properties();
        return new CXSEvent(
                Long.toString(eventId),
                System.currentTimeMillis(),
                "download",
                generateFromStringArray(PROFILE_IDS, random),
                generateFromStringArray(FILE_PATHS, random),
                generateGeoPoint(random),
                downloadProperties
                );
    }

    private CXSGeoPoint generateGeoPoint(Random random) {
        return new CXSGeoPoint(random.nextDouble() * 180.0 - 90.0, random.nextDouble() * 360.0 - 180);
    }

    private String generateFromStringArray(String[] strings, Random random) {
        if (strings == null || strings.length == 0) {
            return null;
        }
        int arrayOffset = random.nextInt(strings.length);
        return strings[arrayOffset];
    }

}
