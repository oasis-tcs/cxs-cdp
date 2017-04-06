var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cxsSchema = require('./cxs-graphql-schema');

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: cxsSchema.schema,
    rootValue: cxsSchema.root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');