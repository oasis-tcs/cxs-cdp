var {buildSchema} = require('graphql');

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

input OrderBy {
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

type ProfileEdge {
  node : Profile
  cursor : String!
}

type ProfileConnection {
  totalCount: Int
  edges : [ProfileEdge]
  pageInfo : PageInfo
}

type CommonProfileEdge {
  node : CommonProfile
  cursor : String!
}

type CommonProfileConnection {
  totalCount: Int
  edges : [CommonProfileEdge]
  pageInfo : PageInfo
}

type PersonaEdge {
  node: Persona
  cursor: String!
}

type PersonaConnection {
  totalCount: Int
  edges : [PersonaEdge]
  pageInfo : PageInfo
}

type SegmentEdge {
  node: Segment
  cursor: String!
}

type SegmentConnection {
  totalCount: Int
  edges : [SegmentEdge]
  pageInfo : PageInfo
}

type ListEdge {
  node: List
  cursor: String!
}

type ListConnection {
  totalCount: Int
  edges : [ListEdge]
  pageInfo : PageInfo
}

type TopicEdge {
  node: Topic
  cursor: String!
}

type TopicConnection {
  totalCount: Int
  edges : [TopicEdge]
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
  id : ID!
  properties : [KeyValue]
  schema: SchemaCompountType
}

input PersonaInput {
  id : ID
  properties : [KeyValueInput]
}

type Segment {
  scope: Scope!
  name : ID! # this can be generated from displayname, but never changed
  displayName : String
  # todo should we do this like this or should we create another condition type to do this ?
  eventFilter : Filter
  profileFilter: Filter
}

input SegmentInput {
  # TODO TBD
}

type List {
  scope: Scope!
  # TODO TBD
}

input List {
  # TODO TBD
}

type Topic {
  scope : Scope!
  id: ID! # cannot change
  displayName : String
}

input TopicInput {
  # TODO TBD
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
  subject: Profile!
  object: String!
  location: [GeoPoint]
  timestamp: Int
  properties: [KeyValue]
}

input EventInput {
  type: [EventTypeInput]!
  subject: String! # this must be a profile ID
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

# PROFILE TYPES
# ----------------------------------------------------------------------------

# Browser --(structured event)--> Client -> Profile -> CommonProfile

type Profile {
  id: ID!
  properties : [KeyValue] # properties must match schema 
  client : Client
  commonProfile : CommonProfile
  schema: SchemaCompoundType # defined in the CXS server configuration 
}

input ProfileInput {
  id: ID # optional in the case of a new profile
  properties: [KeyValueInput]
}

type CommonPropertyValue {
  key: String!
  value: String
  clients : [Client]
}

type Interest {
  topic: Topic!
  score : Float # 0.0 to 1.0
}

type CommonProfile {
  id: ID!
  properties : [CommonPropertyValue] # properties must match schema 
  profiles : [Profile]
  interests: [Interest]
  segments : [Segment]
  events(filter : FilterInput, first : Int, last: Int, after : String, before: String) : EventConnection
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

input ImportOptionsInput {
  strategy : ImportStrategy
}

type Progress {
  percentage: Float
  message: String
}

interface JobStatus {
  progress: Progress
}

type ImportJobStatus implements JobStatus {
  progress: Progress
  importedProfilesCount : Int
  skippedProfiles : [Profile]
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
  id: String!
  thirdPartySystem : Boolean
}

# CONTEXT TYPES
# ----------------------------------------------------------------------------

type ContextQuery {
  filter : [Filter]
}

type Context {
  profile : Profile
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

# INBOUND EVENT TYPES
# ----------------------------------------------------------------------------
# Inbound event could be used to push information from the context server back to a client. An example of an inbound event could 
# include resolved locations, resolved client identification (server). Inbound events could be used for real-time personalization

type Query {
  getEvent(id : String!) : Event
  findEvents(filter : FilterInput, orderBy : [OrderBy], first: Int, after: String, last: Int, before: String) : EventConnection
  
  getProfile(profileId : String) : Profile
  findProfiles(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : ProfileConnection
  
  getPersona(personaId : String) : Persona
  findPersonas(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : PersonaConnection
  
  getSegment(segmentId : String) : Segment
  findSegments(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : SegmentConnection

  getList(listId : String) : List
  findLists(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : ListConnection

  getTopic(topicId : String) : Topic
  findTopics(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : TopicConnection

  getContext(dynamicSegments : [DynamicSegmentInput], profileId: String) : Context  
}

type Mutation {

  # Events may be used to control common profiles, such as controlling privacy settings, reset interests, but mostly profile
  # changes. Mutations will not be added for this
  
  sendEvent(applicationKey: ApplicationKeyInput, EventInput: EventInput!) : Event
  sendEvents(applicationKey: ApplicationKeyInput, EventInputs: [EventInput]!) : Int
  
  createOrUpdateProfile(profile : ProfileInput) : Profile
  deleteProfile(profileId : String) : Profile
  
  createOrUpdatePersona(persona : PersonaInput) : Persona
  deletePersona(personaId : String) : Persona
  
  createOrUpdateSegment(segment : SegmentInput) : Segment
  deleteSegment(segmentId : String) : Segment
  
  createOrUpdateList(list : ListInput) : List
  deleteList(listId : String) : List
  
  createOrUpdateTopic(topic : TopicInput) : Topic
  deleteTopic(topicId : String) : Topic
      
  updateContext(applicationKey: ApplicationKeyInput, events: [EventInput], dynamicSegments : [DynamicSegmentInput], profileId: String!) : Context
  
  startProfileImportJob(applicationKey: ApplicationKeyInput, profiles : [ProfileInput], importOptions: ImportOptionsInput) : String!
}

type Subscription {
  eventListener(profileId : String, filter: FilterInput) : Event!
  
  contextListener(dynamicSegments : [DynamicSegmentInput], profileId: String) : Context
  
  jobListener(jobId: String) : JobStatus
}

`);

var pageViewEventSchema = {
    name: "pageViewEventSchema",
    description: "Schema for a page view event",
    types: [
        {
            name: "targetPage",
            description: "ID of page that has been viewed",
            type: "string",
            identifier: false,
            aliases: []
        }
    ]
};

var profileSchema = {
    name: "profileSchema",
    description: "Schema for a profile",
    types: [
        {
            name: "clientIdentifier",
            description: "ID of the profile for this client",
            type: "string",
            identifier: true,
            aliases: []
        }
    ]
};

var commonProfileSchema = {
    name: "commonProfileSchema",
    description: "Schema for a common profile",
    types: [
        {
            name: "email",
            description: "Email of a profile",
            type: "string",
            identifier: true,
            aliases: []
        }
    ]
};

var pageViewEventType = {
    id: "pageView",
    description: "Page view event",
    schema: pageViewEventSchema
};


let fakeApplicationKeys = {
    '1234567890': {
        client : {
            id : "Saleforce"
        },
        label: "First application key created",
        key: "1234567890",
        permissions: ["createEvent", "createEventTypes", "fullAccess"]
    }
};

let fakeClients = {
    '0': {
        applicationKeys: [fakeApplicationKeys['1234567890']],
        description: "Salesforce.com CXS client",
        id: "Saleforce",
        thirdPartySystem: true
    }
};

var fakeCommonProfiles = {
    '0': {
        id: '0',
        properties: [
            {
                key: "prop1",
                value: "value1",
                clients: [fakeClients['0']]
            }
        ],
        profiles: [],
        interests: [],
        segments: [],
        schema: commonProfileSchema,
    }
};

var fakeProfiles = {
    '0': {
        id: '0',
        properties: [
            {
                key: "clientProp1",
                value: "clientValue1"
            }
        ],
        client: fakeClients['0'],
        commonProfile: fakeCommonProfiles['0'],
        schema: profileSchema
    }
};

var fakeEvents = {
    "0": {
        id: "0",
        type: pageViewEventType,
        subject: fakeProfiles['0'],
        object: "objectId",
        location: {
            latitude: 10.0,
            longitude: 3.0
        },
        timestamp: 0,
        properties: {
            propKey1: "propValue1"
        }
    }
};

// The root provides a resolver function for each API endpoint
exports.root = {
    event: function ({id}) {
        return fakeEvents[id];
    }
};

