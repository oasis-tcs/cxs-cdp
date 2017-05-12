package org.oasis_open.contextserver.graphql;

import java.util.Map;

import static org.oasis_open.contextserver.graphql.CXSArgumentType.*;

/**
 * Created by loom on 12.05.17.
 */
public class CXSFunctionArgument {
    CXSArgumentType type;
    Boolean booleanArg;
    Integer intArg;
    Double floatArg;
    String stringArg;
    CXSFilterFunction functionArg;

    CXSFunctionArgument(Map<String,?> functionArgumentData) {
        this.type = valueOf((String) functionArgumentData.get("type"));
        switch (this.type) {
            case BOOLEAN:
                this.booleanArg = (Boolean) functionArgumentData.get("booleanArg");
                break;
            case INT:
                this.intArg = (Integer) functionArgumentData.get("intArg");
                break;
            case FLOAT:
                this.floatArg = (Double) functionArgumentData.get("floatArg");
                break;
            case STRING:
                this.stringArg = (String) functionArgumentData.get("stringArg");
                break;
            case FILTERFUNCTION:
                Map<String,?> functionArgData = (Map<String,?>) functionArgumentData.get("functionArg");
                this.functionArg = new CXSFilterFunction(functionArgData);
                break;
        }
    }
}
