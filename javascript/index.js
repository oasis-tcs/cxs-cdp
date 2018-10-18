const { ApolloServer } = require('apollo-server');

const { booleanPropertyTypesSchema } = require('./schemas/booleanpropertytypes');
const { cxsGlobalSchema } = require('./schemas/cxsglobal');
const { consentsSchema } = require('./schemas/consents');
const { querySchema } = require('./schemas/query');
const { subscriptionSchema } = require('./schemas/subscription');
const { clientsSchema } = require('./schemas/client');
const { datePropertyTypesSchema } = require('./schemas/datepropertytypes');
const { eventsSchema } = require('./schemas/events');
const { eventTypesSchema } = require('./schemas/eventtypes');
const { filtersSchema } = require('./schemas/filters');
const { floatPropertyTypesSchema } = require('./schemas/floatpropertytypes');
const { geoPointPropertyTypesSchema } = require('./schemas/geopointpropertytypes');
const { identifierPropertyTypesSchema } = require('./schemas/identifierpropertytypes');
const { intPropertyTypesSchema } = require('./schemas/intpropertytypes');
const { listsSchema } = require('./schemas/lists');
const { optimizationsSchema } = require('./schemas/optimizations');
const { paginationSchema } = require('./schemas/pagination');
const { profilesSchema } = require('./schemas/profiles');
const { profilePropertiesSchema } = require('./schemas/profileproperties');
const { propertyTypesSchema } = require('./schemas/propertytypes');
const { personasSchema } = require('./schemas/personas');
const { interestsSchema } = require('./schemas/interests');
const { segmentsSchema } = require('./schemas/segments');
const { segmentFilterInputSchema } = require('./schemas/segmentfilterinput');
const { stringPropertyTypesSchema } = require('./schemas/stringpropertytypes');
const { setPropertyTypesSchema } = require('./schemas/setpropertytypes');
const { topicsSchema } = require('./schemas/topics');
const { viewsSchema } = require('./schemas/views');

const resolvers = {};

const typeDefs = [
    cxsGlobalSchema,
    querySchema,
    subscriptionSchema,
    clientsSchema,
    consentsSchema,
    eventsSchema,
    optimizationsSchema,
    eventTypesSchema,
    profilesSchema,
    profilePropertiesSchema,
    interestsSchema,
    personasSchema,
    topicsSchema,
    segmentsSchema,
    segmentFilterInputSchema,
    listsSchema,
    filtersSchema,
    paginationSchema,
    propertyTypesSchema,
    identifierPropertyTypesSchema,
    stringPropertyTypesSchema,
    intPropertyTypesSchema,
    floatPropertyTypesSchema,
    datePropertyTypesSchema,
    booleanPropertyTypesSchema,
    geoPointPropertyTypesSchema,
    setPropertyTypesSchema,
    viewsSchema
];

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(() => console.log("Server started ! Open your browser at http://localhost:4000"));
