package org.oasis_open.contextserver.graphql;

/**
 * Created by loom on 24.05.17.
 */
public class CXSGeoPoint {
    private double latitude;
    private double longitude;

    public CXSGeoPoint() {
    }

    public CXSGeoPoint(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
