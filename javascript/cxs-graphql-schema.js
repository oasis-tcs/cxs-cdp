var {buildSchema} = require('graphql');
var { GraphQLSchema } = require('graphql'); // CommonJS

// Construct a schema, using GraphQL schema language
exports.schema = buildSchema(`

# GENERIC TYPES
# ----------------------------------------------------------------------------

type KeyValue {
  key: String!
  value : String
}

input KeyValueInput {
  key: String!
  value : String
}

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

# query filteredEvents($filter : Filter, $orderBy : [OrderBy]) {
#   events(filter : $filter, orderBy : $orderBy) {
#     edges {
#       type
#     }
#   }
# }
# variables:
# {
#   "filter": {
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

# query filteredEvents($filter : EventFilter, $orderBy : [EventOrderBy]) {
#   events(filter : $filter, orderBy : $orderBy) {
#     edges {
#       type
#     }
#   }
# }
# variables:
# {
#   "filter": {
#     "OR" : [
#       {
#         "AND" : [
#           { "timestamp_GT" : "January 1st, 2016" }
#           { "timestamp_LT" : "January 1st, 2017" },
#           { "type_EQ" : "PageView" },
#           { "body_QUERY" : "#JSONIQ" }
#         ]
#       },
#       {
#         "location_GEODISTANCE" : { city: "Geneva", distance: "30" }
#       }
#     ]
#   },
#   "orderBy" : [ type_ASC, properties.pageID_DESC ]
# }


# initially wanted to do this but it is not supported by GraphQL :
# union FilterArgument = Boolean | Int | Float | String | FilterFunction

type FilterArgument {
  boolean : Boolean
  int : Int
  float : Float
  string : String
  function : FilterFunction
}

input FilterArgumentInput {
  boolean : Boolean
  int : Int
  float : Float
  string : String
  function : FilterFunctionInput
}

type FilterFunction {
  name : String!
  arguments : [FilterArgument]
}

input FilterFunctionInput {
  name : String!
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

# GLOBAL PROPERTY DEFINITIONS
# ----------------------------------------------------------------------------

# Property types may define simple types such as : 
# - boolean (e.g. musicLover : boolean)
# - inline types (e.g. location : {longitude : float, latitude: float})
# - referenced types (e.g. locations : [location]) 

enum CXSPropertyValueType {
  STRING,
  INT,
  FLOAT,
  DATE, # ISO-8601 format equivalent to Java 8 Instant format.
  BOOLEAN,
  SET # allows for nested property set
}

type CXSPropertyType {
  name : String!
  description : String
  type : CXSPropertyValueType! 
  multivalued : Boolean # must maintain order
  mandatory : Boolean
  identifier : Boolean,
  tags : [String] # profile property type, event property type, etc.. 
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
  scope: String!
  name : ID! # this can be generated from displayname, but never changed
  displayName : String
}

type List {
  scope: Scope!
  name : ID! # this can be generated from displayname, but never changed
  displayName : String
  # TODO TBD
}

input ListInput {
  # TODO TBD
  scope: String!
  name : ID! # this can be generated from displayname, but never changed
  displayName : String
}

type Topic {
  scope : Scope!
  id: ID! # cannot change
  displayName : String
}

input TopicInput {
  # TODO TBD
  scope : String!
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
  eventType: EventType!
  clientProfileId: String!
  profile : Profile!
  object: String!
  location: [GeoPoint]
  timestamp: Int
  # ... properties will be updated based on the defined property types 
}

type EventFilter {
  id_EQ : ID!
  id_NEQ : ID!
  eventTypeId_EQ : String!
  eventTypeId_CONTAINS : String!
  subjectId_EQ : String!
}

# Example event input : 
# 
# { 
#   subject : "12345",
#   timestamp : 1723498748,
#   updateProfile : { 
#       firstName : "Serge",
#       lastName : "Huber
#   }
# }
#
# Event inputs could contain data for multiple event occuring simultaneously. In general, 
# event inputs will only use a single top-level nested property.
#
# { 
#   subject : "12345",
#   timestamp : 1723498748,
#   updateProfile : { 
#       firstName : "Serge",
#       lastName : "Huber
#   }
#   pageView : {
#       pageURL : "/test/test/test.html",
#       referrer : 
#   },
#   salesForceLeadUpdate : {
#   }
#    

input EventInput {
  clientProfileID: String! # this must be a client profile ID
  object: String! # do we need it ?
  location: [GeoPointInput] # optional
  timestamp: Int
  # the actual payload will be dynamically generated based on the configuration property definitions
}

#
# The event input type is dynamically updated to include all the property definitions that were
# added to the context server. Here is an example of what it could look like after a while:
#
# input EventInput {
#   subject: String! # this must be a client profile ID
#   object: String! # do we need it ?
#   location: [GeoPointInput] # optional
#   timestamp: Int
#   updateProfile : UpdateProfileInput,
#   pageView : PageViewInput,
#   saleForcesLeadUpdate : SalesForceLeadUpdateInput
# }
#
# input AddressInput {
#   streetNumber : Int,
#   streetName : String,
#   city : String,
#   postalCode : String,
#   country : String
# }
# 
# input UpdateProfileInput : {
#   firstName : String,
#   lastName : String,
#   email : String,
#   address : AddressInput,
#   twitter : String
#   ...
# }
# 
# input PageViewInput {
#   pagePath : String
#   pageId : String,
#   referrer : String
# }
#
# input SalesForceLeadUpdate {
#   leadStatus : String,
#   leadID : String,
#   firstName : String,
#   lastName : String,
#   email : String
# }

# PROFILE TYPES
# ----------------------------------------------------------------------------

# Wwe update profiles always through
# events and use property mappings to push or pull data between the CXS server and external
# systems such as a CRM. The history of external or internal profile modifications is 
# accessible through the profile update events. CXS must also specify a way to provide 
# subscriptions on profile modifications so that external systems can retrieve the profile 
# modifications. Mappings could be used to control data flow in relations to Privacy 
# management. 

# the flow looks like this : 

# Browser -- (structured event) --> Client -> Mapping -> Profile 

# Profile merges are optional in the CXS specification. They may be supported by using a property
# defined as an identifier as a merge key (multiple merge keys may of course exist) to merge multiple
# profiles. The resulting merged profile MUST contain all the client profile IDs of the merged profiles
# as well as the merged profile data. The original profiles that were merged may be flagged or deleted, 
# this is implementation specific. 

type Interest {
  topic: Topic!
  score : Float # 0.0 to 1.0
}

type Profile {
  id: ID!
  clientProfileIDs : [String] # need to be globally unique across clients so we could prefix them with client ID.
  interests: [Interest]
  segments : [Segment]
  events(filter : FilterInput, first : Int, last: Int, after : String, before: String) : EventConnection
  consents : [Consents]
  # properties must be generated from property type definitions
}

enum MappingDirection {
  LEFT_TO_RIGHT,
  RIGHT_TO_LEFT,
  BIDIRECTIONAL
}

type MappedPropertyType {
  name : String,
  type : String,
  readOnly : Boolean,
  source : String,
  identifier : Boolean,
  truthSource : Boolean
}

type PropertyTypeMapping {
    direction : MappingDirection
    leftProperty : MappedPropertyType
    rightProperty : MappedPropertyType
    fieldConverterIdentifier : String  
    differentialObfuscation : Boolean # optional            
}

#
# Consents are given and revoked through events. This means that the CXS specification defines 
# reserved property types for providing consent grants and revocations.
#
# Examples:
# {
#   scope : "jahia.com",
#   actions : [
#     {name:"send-to-salesforce", description:"send profile data to Salesforce CRM"}, 
#     {name:"location-storage", description:"store my location"}
#   ],
#   grantDate : 3498734899
#   # no revoke date means it will not expire or defaults to system or legal standard (GDPR)
# }
#

type Action {
    name : ID!
    description : String
}

type Consent {
  scope : String
  actions : [Action]
  grantDate : Long
  revokeDate : Long
}

input ConsentInput {
  scope: String,
  actions : [String],
  grantDate : Long,
  revokeDate : Long
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
# Application keys are no longer part of the specification, implementations will probably need to use 
# a concept similar to this so we leave them as example for the time being.
#type ApplicationKey {
#  client: Client!
#  label : String!
#  key: ID!
#  permissions: [String] # "createEvent", "createEventTypes", "fullAccess"
#}

#input ApplicationKeyInput {
#  key: ID!
#}

type Client {
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
  
  # Privacy and consent
  getConsents() : [Consent]
  getAllPersonalData()
  
  
}

type Mutation {

  # Events may be used to control common profiles, such as controlling privacy settings, reset interests, but mostly profile
  # changes. Mutations will not be added for this
  
  logEvents(events: [EventInput]!) : Int  
  
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
      
  updateContext(events: [EventInput], dynamicSegments : [DynamicSegmentInput], profileId: String!) : Context
  
  startProfileImportJob(profiles : [ProfileInput], importOptions: ImportOptionsInput) : String!
  
  # Consent mutations, see http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm
  # todo : maybe this should be done through authorized events
  grantConsent(scope : String, permissions : [String], fromDate : Long, toDate : Long)
  revokeConsent(scope : String, permissions : [String])
  
  # Privacy 
  deleteAllPersonalData()
  
}

type Subscription {
  eventListener(profileId : String, filter: FilterInput) : Event!
  
  contextListener(dynamicSegments : [DynamicSegmentInput], profileId: String) : Context
  
  jobListener(jobId: String) : JobStatus
}

`);


var pageViewEventType = {
    id: "pageView",
    description: "Page view event",
};

let fakeClients = {
    '0': {
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
    getEvent: function ({id}) {
        return fakeEvents[id];
    }
};


var MyAppSchema = new GraphQLSchema({
    query: MyAppQueryRootType,
    mutation: MyAppMutationRootType
});

exports.schema = MyAppSchema;
