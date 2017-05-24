package org.oasis_open.contextserver.graphql;

import graphql.Scalars;
import graphql.schema.*;
import org.osgi.service.component.annotations.Component;

import graphql.servlet.GraphQLQueryProvider;
import graphql.servlet.GraphQLTypesProvider;

import java.util.*;

import static graphql.Scalars.*;
import static graphql.schema.GraphQLArgument.newArgument;
import static graphql.schema.GraphQLFieldDefinition.newFieldDefinition;
import static graphql.schema.GraphQLObjectType.newObject;
import static graphql.schema.GraphQLInputObjectType.newInputObject;
import static graphql.schema.GraphQLInputObjectField.newInputObjectField;
import static graphql.schema.GraphQLEnumType.newEnum;

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

    public static GraphQLInputObjectType CXSFilterArgument = newInputObject()
            .name("FilterArgument")
            .description("A single filter argument value")
            .field(newInputObjectField()
                    .name("boolean")
                    .description("This field will contain the argument value if the type is BOOLEAN")
                    .type(GraphQLBoolean)
                    .build()
            )
            .field(newInputObjectField()
                    .name("int")
                    .description("This field will contain the argument value if the type is INT")
                    .type(GraphQLLong)
                    .build()
            )
            .field(newInputObjectField()
                    .name("float")
                    .description("This field will contain the argument value if the type is FLOAT")
                    .type(GraphQLFloat)
                    .build()
            )
            .field(newInputObjectField()
                    .name("string")
                    .description("This field will contain the argument value if the type is STRING")
                    .type(GraphQLFloat)
                    .build()
            )
            .field(newInputObjectField()
                    .name("function")
                    .description("This field will contain the argument value if the type is FILTERFUNCTION")
                    .type(new GraphQLTypeReference("FilterFunction"))
                    .build()
            )
            .build();

    public static GraphQLInputObjectType CXSFilterFunction = newInputObject()
            .name("FilterFunction")
            .description("A filter function is used to filter object collections")
            .field(newInputObjectField()
                    .name("name")
                    .description("The name of the function")
                    .type(GraphQLString)
                    .build()
            )
            .field(newInputObjectField()
                    .name("arguments")
                    .description("The arguments of the function")
                    .type(new GraphQLList(CXSFilterArgument))
                    .build()
            )
            .build();

    public static GraphQLEnumType CXSSortOrder = newEnum()
            .name("SortOrder")
            .description("The possible direction for a sort order")
            .value("ASC")
            .value("DESC")
            .value("UNSPECIFIED")
            .build();

    public static GraphQLInputObjectType CXSOrderBy = newInputObject()
            .name("OrderBy")
            .description("A type that contains information on how to order by field values")
            .field(newInputObjectField()
                    .name("fieldName")
                    .description("The name of the field to sort by")
                    .type(GraphQLString)
                    .build()
            )
            .field(newInputObjectField()
                    .name("order")
                    .description("The direction of the sorting (order)")
                    .type(CXSSortOrder)
                    .build()
            )
            .build();

    public static GraphQLType CXSScope = newObject()
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

    public static GraphQLType CXSTopic = newObject()
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

    public static List<GraphQLArgument> newRelayCursorArguments() {
        List<GraphQLArgument> arguments = new ArrayList<GraphQLArgument>();
        arguments.add(newArgument()
                .name("first")
                .description("Number of arguments to retrieve from the position of the 'after' cursor")
                .type(Scalars.GraphQLLong)
                .build());
        arguments.add(newArgument()
                .name("after")
                .description("The cursor position at which to start retrieving the number of elements specified by the 'first' argument")
                .type(Scalars.GraphQLString)
                .build());
        arguments.add(newArgument()
                .name("last")
                .description("The number of elements to retrieve before the 'before' cursor position")
                .type(Scalars.GraphQLLong)
                .build());
        arguments.add(newArgument()
                .name("before")
                .description("The cursor position at which to end retrieve the 'last' number of elements")
                .type(Scalars.GraphQLString)
                .build());
        return arguments;
    }
}
