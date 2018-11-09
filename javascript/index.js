const { ApolloServer } = require('apollo-server');
const { cdpGlobalSchema } = require('./schemas/cdpglobal');
const { booleanPropertyTypesSchema } = require('./schemas/booleanpropertytypes');
const { consentsSchema } = require('./schemas/consents');
const { clientsSchema } = require('./schemas/client');
const { datePropertyTypesSchema } = require('./schemas/datepropertytypes');
const { eventsSchema } = require('./schemas/events');
const { eventFiltersSchema } = require('./schemas/eventfilters');
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
const { profileFiltersSchema } = require('./schemas/profilefilters');
const { propertyTypesSchema } = require('./schemas/propertytypes');
const { personasSchema } = require('./schemas/personas');
const { interestsSchema } = require('./schemas/interests');
const { sourcesSchema } = require('./schemas/sources');
const { managementFiltersSchema } = require('./schemas/managementfilters');
const { segmentsSchema } = require('./schemas/segments');
const { stringPropertyTypesSchema } = require('./schemas/stringpropertytypes');
const { setPropertyTypesSchema } = require('./schemas/setpropertytypes');
const { topicsSchema } = require('./schemas/topics');
const { viewsSchema } = require('./schemas/views');

const resolvers = {};

const typeDefs = [
    cdpGlobalSchema,
    clientsSchema,
    consentsSchema,
    eventsSchema,
    eventFiltersSchema,
    optimizationsSchema,
    eventTypesSchema,
    profilesSchema,
    profileFiltersSchema,
    profilePropertiesSchema,
    interestsSchema,
    personasSchema,
    topicsSchema,
    segmentsSchema,
    sourcesSchema,
    managementFiltersSchema,
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
