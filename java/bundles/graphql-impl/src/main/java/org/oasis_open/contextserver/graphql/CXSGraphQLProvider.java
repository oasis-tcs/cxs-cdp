package org.oasis_open.contextserver.graphql;

import graphql.schema.*;
import org.osgi.service.component.annotations.Component;

import graphql.servlet.GraphQLQueryProvider;
import graphql.servlet.GraphQLTypesProvider;

import java.util.*;

import static graphql.Scalars.GraphQLBoolean;
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
                .type(new GraphQLList(CXSScope))
                .name("scopes")
                .description("Access Context Server scopes")
                .dataFetcher(new DataFetcher() {
                    public Object get(DataFetchingEnvironment environment) {
                        Map<String,Object> map = environment.getContext();
                        return map.keySet();
                    }
                }).build());
        fieldDefinitions.add(newFieldDefinition()
                .type(new GraphQLList(CXSTopic))
                .name("topics")
                .description("Access Context Server topics").build());
        return fieldDefinitions;
    }

    public Collection<GraphQLFieldDefinition> getMutations() {
        return null;
    }

    public Collection<GraphQLType> getTypes() {

        List<GraphQLType> types = new ArrayList<GraphQLType>();

        types.add(CXSScope);
        types.add(CXSTopic);

        return types;
    }

    private static GraphQLType CXSScope = newObject()
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

    private static GraphQLType CXSTopic = newObject()
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

    public static GraphQLObjectType CXSPageInfo = newObject()
                .name("PageInfo")
                .description("Relay Cursor Connection Page information object")
                .field(newFieldDefinition()
                        .type(GraphQLBoolean)
                        .name("hasPreviousPage")
                        .description("Returns true if the collection has a previous page")
                        .dataFetcher(new DataFetcher() {
                            public Object get(DataFetchingEnvironment environment) {
                                RelayPageInfo relayPageInfo = environment.getSource();
                                return relayPageInfo.isHasPreviousPage();
                            }
                        })
                )
                .field(newFieldDefinition()
                        .type(GraphQLBoolean)
                        .name("hasNextPage")
                        .description("Returns true if the collection has a next page")
                        .dataFetcher(new DataFetcher() {
                            public Object get(DataFetchingEnvironment environment) {
                                RelayPageInfo relayPageInfo = environment.getSource();
                                return relayPageInfo.isNextPage();
                            }
                        })
                )
                .build();

    public static GraphQLObjectType newCXSEdge(String objectName, GraphQLObjectType graphQLObjectType) {
        return newObject()
                .name(objectName + "Edge")
                .description("Realy Cursor Connection edge")
                .field(newFieldDefinition()
                        .type(graphQLObjectType)
                        .name("node")
                        .description("Returns the edge node")
                        .dataFetcher(new DataFetcher() {
                            public Object get(DataFetchingEnvironment environment) {
                                RelayEdge<?> relayEdge = environment.getSource();
                                return relayEdge.getNode();
                            }
                        })
                )
                .field(newFieldDefinition()
                        .type(GraphQLString)
                        .name("cursor")
                        .description("Returns the edge cursor")
                        .dataFetcher(new DataFetcher() {
                            public Object get(DataFetchingEnvironment environment) {
                                RelayEdge<?> relayEdge = environment.getSource();
                                return relayEdge.getCursor();
                            }
                        })
                )
                .build();
    }

    public static GraphQLObjectType newCXSConnection(String objectName, GraphQLObjectType graphQLObjectType) {
        return newObject()
                .name(objectName + "Connection")
                .description("Realy Cursor Connection type")
                .field(newFieldDefinition()
                        .type(new GraphQLList(newCXSEdge(objectName, graphQLObjectType)))
                        .name("edges")
                        .description("Returns the edges collection")
                        .dataFetcher(new DataFetcher() {
                            public Object get(DataFetchingEnvironment environment) {
                                RelayConnection<?> relayConnection = environment.getSource();
                                return relayConnection.getEdges();
                            }
                        })
                )
                .field(newFieldDefinition()
                        .type(CXSPageInfo)
                        .name("pageInfo")
                        .description("Returns the page Info object")
                        .dataFetcher(new DataFetcher() {
                            public Object get(DataFetchingEnvironment environment) {
                                RelayConnection<?> relayConnection = environment.getSource();
                                return relayConnection.getPageInfo();
                            }
                        })
                )
                .build();
    }
}
