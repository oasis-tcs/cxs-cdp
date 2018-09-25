const { ApolloServer } = require('apollo-server');

const { cxsGlobalSchema } = require('./schemas/cxsglobal');
const { querySchema } = require('./schemas/query');
const { subscriptionSchema } = require('./schemas/subscription');
const { clientsSchema } = require('./schemas/client');
const { eventsSchema } = require('./schemas/events');
const { eventTypesSchema } = require('./schemas/eventtypes');
const { profilesSchema } = require('./schemas/profiles');
const { profilePropertiesSchema } = require('./schemas/profileproperties');
const { personasSchema } = require('./schemas/personas');
const { interestsSchema } = require('./schemas/interests');
const { topicsSchema } = require('./schemas/topics');
const { segmentsSchema } = require('./schemas/segments');
const { segmentFilterInputSchema } = require('./schemas/segmentfilterinput');
const { filtersSchema } = require('./schemas/filters');
const { paginationSchema } = require('./schemas/pagination');
const { propertyTypesSchema } = require('./schemas/propertytypes');
const { identifierPropertyTypesSchema } = require('./schemas/identifierpropertytypes');
const { stringPropertyTypesSchema } = require('./schemas/stringpropertytypes');
const { intPropertyTypesSchema } = require('./schemas/intpropertytypes');
const { floatPropertyTypesSchema } = require('./schemas/floatpropertytypes');
const { datePropertyTypesSchema } = require('./schemas/datepropertytypes');
const { booleanPropertyTypesSchema } = require('./schemas/booleanpropertytypes');
const { geoPointPropertyTypesSchema } = require('./schemas/geopointpropertytypes');
const { setPropertyTypesSchema } = require('./schemas/setpropertytypes');

const resolvers = {};

const typeDefs = [
    cxsGlobalSchema,
    querySchema,
    subscriptionSchema,
    clientsSchema,
    eventsSchema,
    eventTypesSchema,
    profilesSchema,
    profilePropertiesSchema,
    interestsSchema,
    personasSchema,
    topicsSchema,
    segmentsSchema,
    segmentFilterInputSchema,
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
    setPropertyTypesSchema
];

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(() => console.log("Server started ! Open your browser at http://localhost:4000"));
