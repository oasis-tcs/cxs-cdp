package org.oasis_open.contextserver.graphql;

import java.util.List;

/**
 * Created by loom on 12.05.17.
 */
public class RelayConnection<T> {
    List<RelayEdge<T>> edges;
    RelayPageInfo pageInfo;

    public RelayConnection(List<RelayEdge<T>> edges, RelayPageInfo pageInfo) {
        this.edges = edges;
        this.pageInfo = pageInfo;
    }

    public List<RelayEdge<T>> getEdges() {
        return edges;
    }

    public RelayPageInfo getPageInfo() {
        return pageInfo;
    }
}
