package org.oasis_open.contextserver.graphql;

import java.util.Properties;

/**
 * Created by loom on 24.05.17.
 */
public class CXSEventInput {
    private String eventTypeId;
    private String subjectId;
    private String object;
    private CXSGeoPoint location;
    private Long timestamp;
    private Properties properties;
}
