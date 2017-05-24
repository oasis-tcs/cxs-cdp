package org.oasis_open.contextserver.graphql;

import java.util.Properties;

/**
 * Created by loom on 04.05.17.
 */
public class CXSEvent {
    private String id;
    private Long timestamp;
    private String eventType;

    private String subject; // e.g. profileId
    private String object; // e.g. page
    private CXSGeoPoint location;

    private Properties properties;

    public CXSEvent() {
    }

    public CXSEvent(String id, Long timestamp, String eventType, String subject, String object, CXSGeoPoint location, Properties properties) {
        this.id = id;
        this.timestamp = timestamp;
        this.eventType = eventType;
        this.subject = subject;
        this.object = object;
        this.location = location;
        this.properties = properties;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public CXSGeoPoint getLocation() {
        return location;
    }

    public void setLocation(CXSGeoPoint location) {
        this.location = location;
    }

    public Properties getProperties() {
        return properties;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }
}
