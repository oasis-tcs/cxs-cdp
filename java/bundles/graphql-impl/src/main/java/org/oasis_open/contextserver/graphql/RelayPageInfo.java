package org.oasis_open.contextserver.graphql;

/**
 * Created by loom on 12.05.17.
 */
public class RelayPageInfo {
    boolean hasPreviousPage;
    boolean nextPage;

    public RelayPageInfo(boolean hasPreviousPage, boolean nextPage) {
        this.hasPreviousPage = hasPreviousPage;
        this.nextPage = nextPage;
    }

    public boolean isHasPreviousPage() {
        return hasPreviousPage;
    }

    public boolean isNextPage() {
        return nextPage;
    }
}
