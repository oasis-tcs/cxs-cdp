package org.oasis_open.contextserver.graphql;

/**
 * Created by loom on 12.05.17.
 */
public class RelayEdge<T> {
    T node;
    String cursor;

    public RelayEdge(T node, String cursor) {
        this.node = node;
        this.cursor = cursor;
    }

    public T getNode() {
        return node;
    }

    public String getCursor() {
        return cursor;
    }

}
