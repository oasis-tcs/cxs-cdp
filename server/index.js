const { ApolloServer } = require('apollo-server');
const { cdpGlobalSchema } = require('./schemas/cdpglobal');
const { consentsSchema } = require('./schemas/consents');
const { clientsSchema } = require('./schemas/client');
const { eventsSchema } = require('./schemas/events');
const { eventFiltersSchema } = require('./schemas/eventfilters');
const { filtersSchema } = require('./schemas/filters');
const { listsSchema } = require('./schemas/lists');
const { optimizationsSchema } = require('./schemas/optimizations');
const { paginationSchema } = require('./schemas/pagination');
const { propertyTypesSchema } = require('./schemas/properties');
const { profilesSchema } = require('./schemas/profiles');
const { profileFiltersSchema } = require('./schemas/profilefilters');
const { personasSchema } = require('./schemas/personas');
const { interestsSchema } = require('./schemas/interests');
const { sourcesSchema } = require('./schemas/sources');
const { managementFiltersSchema } = require('./schemas/managementfilters');
const { segmentsSchema } = require('./schemas/segments');
const { datePropertySchema } = require('./schemas/properties/date');
const { booleanPropertySchema } = require('./schemas/properties/boolean');
const { floatPropertySchema } = require('./schemas/properties/float');
const { geoPointPropertySchema } = require('./schemas/properties/geopoint');
const { identifierPropertySchema } = require('./schemas/properties/identifier');
const { intPropertySchema } = require('./schemas/properties/int');
const { stringPropertySchema } = require('./schemas/properties/string');
const { enumerationPropertySchema } = require('./schemas/properties/enum');
const { setPropertySchema } = require('./schemas/properties/set');
const { sessionsSchema } = require('./schemas/sessions');
const { objectsSchema } = require('./schemas/objects');
const { topicsSchema } = require('./schemas/topics');
const { viewsSchema } = require('./schemas/views');

const resolvers = {};

const typeDefs = [
    cdpGlobalSchema,
    clientsSchema,
    sessionsSchema,
    objectsSchema,
    consentsSchema,
    eventsSchema,
    eventFiltersSchema,
    optimizationsSchema,
    profilesSchema,
    profileFiltersSchema,
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
    identifierPropertySchema,
    stringPropertySchema,
    intPropertySchema,
    floatPropertySchema,
    datePropertySchema,
    booleanPropertySchema,
    geoPointPropertySchema,
    enumerationPropertySchema,
    setPropertySchema,
    viewsSchema
];

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(() => console.log("Server started ! Open your browser at http://localhost:4000"));
