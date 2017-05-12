package org.oasis_open.contextserver.graphql;

import java.util.Map;

/**
 * Created by loom on 12.05.17.
 */
public class CXSOrderBy {
    String fieldName;
    CXSSortOrder order;

    CXSOrderBy(Map<String,?> orderByData) {
        this.fieldName = (String) orderByData.get("fieldName");
        this.order = CXSSortOrder.valueOf((String) orderByData.get("order"));
    }
}
