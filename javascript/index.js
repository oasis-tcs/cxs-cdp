const { ApolloServer } = require('apollo-server');

const { cxsGlobalSchema } = require('./cxs-graphql-schema');
const { cxsFiltersSchema } = require('./cxs-filters-schema');
const { cxsPaginationSchema } = require('./cxs-pagination-schema');
const { cxsPropertyTypesSchema } = require('./cxs-propertytypes-schema');

const resolvers = {};

const typeDefs = [
    cxsGlobalSchema,
    cxsFiltersSchema,
    cxsPaginationSchema,
    cxsPropertyTypesSchema
];

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(() => console.log("Server started ! Open your browser at http://localhost:4000"));
