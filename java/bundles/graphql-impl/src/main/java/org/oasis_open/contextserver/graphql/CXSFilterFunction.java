package org.oasis_open.contextserver.graphql;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by loom on 12.05.17.
 */
public class CXSFilterFunction {
    String name;
    List<CXSFunctionArgument> arguments;

    CXSFilterFunction(Map<String,?> filterFunctionArgument) {
        this.name = (String) filterFunctionArgument.get("name");
        List<Map<String,?>> argumentList = (List<Map<String,?>>) filterFunctionArgument.get("arguments");
        this.arguments = new ArrayList<CXSFunctionArgument>();
        if (argumentList != null) {
            for (Map<String, ?> argument : argumentList) {
                this.arguments.add(new CXSFunctionArgument(argument));
            }
        }
    }
}
