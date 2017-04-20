package org.oasis_open.contextserver.graphql;

import graphql.schema.*;
import org.osgi.service.component.annotations.Component;

import graphql.servlet.GraphQLQueryProvider;
import graphql.servlet.GraphQLTypesProvider;

import java.util.*;

import static graphql.Scalars.GraphQLID;
import static graphql.Scalars.GraphQLString;
import static graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
import static graphql.schema.GraphQLObjectType.newObject;

/**
 * Created by loom on 06.04.17.
 */
@Component(
        name="CXSGraphQLProvider",
        immediate=true
)
public class CXSGraphQLProvider implements GraphQLQueryProvider, GraphQLTypesProvider {

    private static Map<String,Object> data = new HashMap<String,Object>();

    /**
     * Constructor to populate data
     */
    public CXSGraphQLProvider() {
        data.put("scope1", "12345");
        data.put("scope2", "23456");
    }

    public Collection<GraphQLFieldDefinition> getQueries() {
        List<GraphQLFieldDefinition> fieldDefinitions = new ArrayList<GraphQLFieldDefinition>();
        fieldDefinitions.add(newFieldDefinition()
                .type(new GraphQLList(CXSGraphQLScope))
                .name("scopes")
                .description("Access Context Server scopes")
                .dataFetcher(new DataFetcher() {
                    public Object get(DataFetchingEnvironment environment) {
                        Map<String,Object> map = environment.getContext();
                        return map.keySet();
                    }
                }).build());
        fieldDefinitions.add(newFieldDefinition()
                .type(new GraphQLList(CXSGraphQLTopic))
                .name("topics")
                .description("Access Context Server topics").build());
        return fieldDefinitions;
    }

    public Collection<GraphQLFieldDefinition> getMutations() {
        return null;
    }

    public Collection<GraphQLType> getTypes() {

        List<GraphQLType> types = new ArrayList<GraphQLType>();

        types.add(CXSGraphQLScope);
        types.add(CXSGraphQLTopic);

        return types;
    }

    private static GraphQLType CXSGraphQLScope = newObject()
                .name("Scope")
                .description("A scope is used to regroup management object")
                .field(newFieldDefinition()
                        .type(GraphQLID)
                        .name("id")
                        .dataFetcher(new DataFetcher() {
                            public Object get(DataFetchingEnvironment environment) {
                                String key = (String) environment.getContext();
                                return data.get(key);
                            }
                        })
                ).build();

    private static GraphQLType CXSGraphQLTopic = newObject()
            .name("Topic")
            .description("A topic is used to track interests")
            .field(newFieldDefinition()
                    .type(GraphQLID)
                    .name("id")
                    .staticValue("topicId")
            )
            .field(newFieldDefinition()
                    .type(GraphQLString)
                    .name("name")
                    .staticValue("topicName")
            ).build();

}
