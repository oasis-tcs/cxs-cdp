package org.oasis_open.contextserver.graphql;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;

import graphql.schema.GraphQLFieldDefinition;
import graphql.schema.GraphQLObjectType;
import graphql.schema.GraphQLType;
import graphql.servlet.GraphQLMutationProvider;
import graphql.servlet.GraphQLQueryProvider;
import graphql.servlet.GraphQLTypesProvider;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static graphql.Scalars.GraphQLID;
import static graphql.Scalars.GraphQLString;
import static graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
import static graphql.schema.GraphQLObjectType.newObject;

/**
 * Created by loom on 06.04.17.
 */
@Component(
        name="CXSGraphQLProvider"
)
public class CXSGraphQLProvider implements GraphQLQueryProvider, GraphQLMutationProvider, GraphQLTypesProvider {
    public GraphQLObjectType getQuery() {
        return null;
    }

    public Object context() {
        return null;
    }

    public String getName() {
        return null;
    }

    public Collection<GraphQLFieldDefinition> getMutations() {
        return null;
    }

    public Collection<GraphQLType> getTypes() {

        List<GraphQLType> types = new ArrayList<GraphQLType>();

        GraphQLObjectType scopeType = newObject()
                .name("scope")
                .description("A container for Context Server management objects")
                .field(newFieldDefinition()
                        .type(GraphQLID)
                        .name("id")
                ).build();

        types.add(scopeType);

        return types;
    }
}
