var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
exports.schema = buildSchema(`
# QUERY AND FILTER TYPES
# ----------------------------------------------------------------------------
enum SortOrder {
  ASC,
  DESC,
  UNSPECIFIED
}

# (timestamp > January 1st, 2016 AND timestamp < January 1st, 2017 AND type = 'PageView') OR location is in Geneva Area
# OR(
#   AND(
#     GT(timeStamp, January 1st 2016),
#     LT(timeStamp, January 1st 2017),
#     EQUALS(type, 'PageView')
#   ),
#   GEODISTANCE(location,'Geneva', '30km')
# )

# query filteredEvents(filter : Filter, orderBy : [OrderBy]) {
#   events(filter : $filter, orderBy : $orderBy) {
#     edges {
#       type
#     }
#   }
# }
# variables:
# {
#   "filterFunction": {
#     "function" : "OR",
#     "arguments" : [
#       {
#         "function" : "AND",
#         "arguments" : [
#           { "function" : "GT", "arguments" : [ "timeStamp", "January 1st, 2016" ] },
#           { "function" : "LT", "arguments" : [ "timeStamp", "January 1st, 2017" ] },
#           { "function" : "EQUALS", "arguments" : [ "type", "PageView" ] },
#         ]
#       },
#       {
#         "function" : "GEODISTANCE",
#         "arguments" : [ "location", "Geneva", "30km" ]
#       }
#     ]
#   },
#   "orderBy" : [
#     { fieldName : "type", order : "ASC" },
#     { fieldName : "properties.pageID", order : "DESC" }
#   ]
# }

# initially wanted to do this but it is not supported by GraphQL :
# union FilterArgument = Boolean | Int | Float | String | FilterFunction

enum FilterArgumentType {
  BOOLEAN,
  INT,
  FLOAT,
  STRING,
  FILTERFUNCTION
}

type FilterArgument {
  type: FilterArgumentType
  booleanArg : Boolean
  intArg : Int
  floatArg : Float
  stringArg : String
  functionArg : FilterFunction
}

input FilterArgumentInput {
  type: FilterArgumentType
  booleanArg : Boolean
  intArg : Int
  floatArg : Float
  stringArg : String
  functionArg : FilterFunctionInput
}

type FilterFunction {
  function : String!
  arguments : [FilterArgument]
}

input FilterFunctionInput {
  function : String!
  arguments : [FilterArgumentInput]
}

type OrderBy {
  fieldName : String # eg : endTime, properties.location
  order : SortOrder
}

type Filter {
  filterFunction : FilterFunction
}

input FilterInput {
  filterFunction : FilterFunctionInput
}

# PAGINATION-RELATED TYPES
# ----------------------------------------------------------------------------

type PageInfo {
  hasPreviousPage : Boolean!
  hasNextPage : Boolean!
}

type EventEdge {
  node : Event
  cursor : String!
}

type EventConnection {
  edges : [EventEdge]
  pageInfo : PageInfo
}

type ClientProfileEdge {
  node : ClientProfile
  cursor : String!
}

type ClientProfileConnection {
  edges : [ClientProfileEdge]
  pageInfo : PageInfo
}

type MasterProfileEdge {
  node : MasterProfile
  cursor : String!
}

type MasterProfileConnection {
  edges : [MasterProfileEdge]
  pageInfo : PageInfo
}

# GENERIC SCHEMA DEFINITIONS
# ----------------------------------------------------------------------------

# the union is used to make it possible to define recursive type structures

union SchemaType = SchemaScalarType | SchemaCompoundType

type SchemaScalarType {
  name : String!
  description : String
  type : String # scalar type
  identifier : Boolean
  aliases : [String] # email, e-mail, mail, mel, couriel
}

type SchemaCompoundType {
  name : String!
  description : String
  types : [SchemaType]
}

type KeyValue {
  key: String!
  value : String
}

input KeyValueInput {
  key: String!
  value : String
}

# MANAGEMENT OBJECTS
# ----------------------------------------------------------------------------

# Management objects are associated with a scope
type Scope {
  id: ID!
}

type Persona {
  scope : Scope!
}

type Segment {
  scope: Scope!
  name : ID! # this can be generated from displayname, but never changed
  displayName : String
  # todo should we do this like this or should we create another condition type to do this ?
  eventFilter : Filter
  profileFilter: Filter
}

type List {
  scope: Scope!
}

type Topic {
  scope : Scope!
  id: ID! # cannot change
  displayName : String
}

# EVENT-RELATED TYPES
# ----------------------------------------------------------------------------

type GeoPoint {
  latitude : Float
  longitude: Float
}

input GeoPointInput {
  latitude : Float
  longitude: Float
}

type Event {
  id: ID!
  type: [EventType]!
  subject: ClientProfile!
  object: String!
  location: [GeoPoint]
  timestamp: Int
  properties: [KeyValue]
}

input EventInput {
  type: [EventTypeInput]!
  subject: ClientProfileInput!
  object: String!
  location: [GeoPointInput]
  timestamp: Int
  properties: [KeyValueInput]
}

# event types are defined using schema types, see event-analysis.md for examples

type EventType {
  id: ID! # human-readable, unique, ex: org.oasis-open.cxs.webClient.PageView,org.acmeCrm.cxs.crmClient.ColdCall
  description: String
  schema : SchemaCompoundType
}

input EventTypeInput {
  id: ID! # human-readable, unique, ex: org.oasis-open.cxs.webClient.PageView,org.acmeCrm.cxs.crmClient.ColdCall
}

# Queries
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Definitions

type Query {
  event(id : String) : Event
  events(filter : Filter, orderBy : [OrderBy]) : [EventConnection]
}

# Mutations 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Definitions

type Mutation {
  createEvent(applicationKey: ApplicationKeyInput, EventInput: EventInput!) : Event
  collectEvent(applicationKey: ApplicationKeyInput, EventInputs: [EventInput]!) : Int
}

# PROFILE TYPES
# ----------------------------------------------------------------------------

# Browser --(structured event)--> Client -> ClientProfile -> MasterProfile

type ClientProfile {
  id: ID!
  properties : [KeyValue] # properties must match schema 
  client : Client
  masterProfile : MasterProfile
  schema: SchemaCompoundType # defined in the CXS server configuration 
}

input ClientProfileInput {
  id: ID!
}

type MasterPropertyValue {
  key: String!
  value: String
  clients : [Client]
}

type Interest {
  topic: Topic!
  score : Float # 0.0 to 1.0
}

type MasterProfile {
  id: ID!
  properties : [MasterPropertyValue] # properties must match schema 
  clientProfiles : [ClientProfile]
  interests: [Interest]
  segments : [Segment]
  events(filter : FilterInput, first : Int, last: Int, after : String, before: String) : [EventConnection] # TODO: decide whether to use Relay-style pagination or another one
  privacy : Privacy
  schema: SchemaCompoundType  # defined in the CXS server configuration 
}

type Privacy {
  doNotTrack: Boolean
  anonymousBrowsing : Boolean
  propertiesPolicy : [PropertyPolicy]
}

type PropertyPolicy {
  propertyKey : String!
  policyName : String!
}

# TODO do we need both this and policy ?
type PropertyPermission {
  permission : String!
  applicationKey : ApplicationKey
}

enum ImportStrategy {
  SKIP,
  OVERWRITE, 
  MERGE
}

type ImportOptions {
  strategy : ImportStrategy
  
}

type Progress {
  percentage: Float
  message: String
}

type ImportResult {
  progress: Progress
  importedProfilesCount : Int
  skippedProfiles : [ClientProfile]
}

# Queries
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Definitions

type Query {
  count(filter : Filter) : Int # used to count profiles matching a condition
  profilesByTopic(topicId : String) : [MasterProfile]
}

# Subscription
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

type Subscription {
  importClientProfiles(applicationKey: ApplicationKeyInput, profiles : [ClientProfile], importOptions: ImportOptions) : ImportResult
}

# CLIENT TYPES
# ----------------------------------------------------------------------------
type ApplicationKey {
  client: Client!
  label : String!
  key: ID!
  permissions: [String] # "createEvent", "createEventTypes", "fullAccess"
}

input ApplicationKeyInput {
  key: ID!
}

type Client {
  applicationKeys: [ApplicationKey]
  description: String!
  name: String!
  thirdPartySystem : Boolean
}

# CONTEXT TYPES
# ----------------------------------------------------------------------------

type ContextQuery {
  filter : [Filter]
}

type Context {
  clientProfile : ClientProfile
  properties : [KeyValue] # could be computed by querying events, or stored pre-computed (ipAddress=1.2.3.4, location=TGV from Geneva to Paris, Wagon 12, Seat 71)
  events(filter : FilterInput) : [Event] # e.g. last 5 events the user has sent
  segments : [Segment]
  dynamicSegments : [DynamicSegmentMatch]
  interests : [Interest]
  initiated : Int
  terminated : Int  
}

# Dynamic segments are used to evaluate segment definitions stored in other systems (such as a WCM for personalization)
input DynamicSegmentInput {
  name : String!
  filter: FilterInput
}

type DynamicSegmentMatch {
  name : String
  matched : Boolean
  executionTimeMillis : Int
}

# Queries
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Definitions

type Query {
  context(dynamicSegments : [DynamicSegmentInput], clientProfileId: String) : Context
}


# Mutations
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Definitions

type Mutation {
  getContext(applicationKey: ApplicationKeyInput, events: [EventInput], dynamicSegments : [DynamicSegmentInput], clientProfileId: String!) : Context
}


# Subscriptions
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Definitions

type Subscription {
  context(dynamicSegments : [DynamicSegmentInput], clientProfileId: String) : Context
}


# INBOUND EVENT TYPES
# ----------------------------------------------------------------------------
# Inbound event could be used to push information from the context server back to a client. An example of an inbound event could 
# include resolved locations, resolved client identification (server). Inbound events could be used for real-time personalization

type Subscription {
  inboundEvents(clientProfileId : String, filter: FilterInput) : Event!
}


`);

// The root provides a resolver function for each API endpoint
exports.root = {
};

