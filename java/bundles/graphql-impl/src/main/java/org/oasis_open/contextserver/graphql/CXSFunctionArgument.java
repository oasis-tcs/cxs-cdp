package org.oasis_open.contextserver.graphql;

import java.util.Map;

/**
 * Created by loom on 12.05.17.
 */
public class CXSFunctionArgument {
    Boolean booleanValue;
    Integer intValue;
    Double floatValue;
    String stringValue;
    CXSFilterFunction functionValue;

    CXSFunctionArgument(Map<String,?> functionArgumentData) {
        // @todo we should add a check that we only have one value. If not we should reject the query
        this.booleanValue = (Boolean) functionArgumentData.get("boolean");
        this.intValue = (Integer) functionArgumentData.get("int");
        this.floatValue = (Double) functionArgumentData.get("float");
        this.stringValue = (String) functionArgumentData.get("string");
        Map<String,?> functionArgData = (Map<String,?>) functionArgumentData.get("function");
        this.functionValue = new CXSFilterFunction(functionArgData);
    }
}
