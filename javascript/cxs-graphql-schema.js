var {buildSchema} = require('graphql');
var { GraphQLSchema } = require('graphql'); // CommonJS

// Construct a schema, using GraphQL schema language
exports.schema = buildSchema(`

#
# Recommended deployment architecture
# -----------------------------------
#
# Browser -> CXS (or custom) Web Client -> Public methods (getProfile, logEvents) Unomi will probably provide a built-in web client
# Browser -> Authentication Proxy Client -> Self-management APIs (updateProfile)   
# Browser -> Backend Proxy Client -> Management APIs (all)
#
# Pre-defined security roles:
# ---------------------------
#
# Roles : administrator, authenticated, public 
#
# Securing queries, mutations and subscriptions:
# ----------------------------------------------
# Client are recognized using tokens. Client have roles that have associated permissions on CXS GraphQL methods. 
# The CXS server must reject any methods that are not authorized for a client.
# CXS server implementations may also control access to profile properties based on the client.
# 
# Recommended default permissions for roles:
#
# role - permissions
# public - getProfile, logEvents
# authenticated - updateProfile, exportAllYourData, forgetMe
# administrator - all 
#
# Open question : should the administrative user have an associated client Id ? (maybe it shouldn't).

# QUERY AND FILTER TYPES
# ----------------------------------------------------------------------------
enum SortOrder {
  ASC,
  DESC,
  UNSPECIFIED
}

#
# Example queries:
# For segments:
#   profiles that are between 30 and 50 
#     and that have viewed 5 pages in the last 10 days
#   profiles that are between 30 and 50 and that are female 
#     or that have purchased 3 products in the last 10 days 
#     and never logged in 
#
# (timestamp > January 1st, 2016 AND timestamp < January 1st, 2017 AND type = 'PageView') OR location is in Geneva Area
# OR(
#   AND(
#     GT(timeStamp, January 1st 2016),
#     LT(timeStamp, January 1st 2017),
#     EQUALS(type, 'PageView')
#   ),
#   GEODISTANCE(location,'Geneva', '30km')
# )

# query filteredEvents($filter : EventFilter, $orderBy : [OrderBy]) {
#   events(filter : $filter, orderBy : $orderBy) {
#     edges {
#       type
#     }
#   }
# }
# variables:
# {
#   "filter": {
#     "or" : [
#       {
#         "and" : [
#           { "eventProperty" : { "operator" : "GT", "property" : "timeStamp", "value": "January 1st, 2016" },
#           { "eventProperty" : { "operator" : "LT", "property" : "timeStamp", "value": "January 1st, 2017" },
#           { "eventProperty" : { "operator" : "EQUALS", "property" : "type", "value": "PageView" },
#         ]
#       },
#       {
#         "eventPropertyGeoDistance": { "property": "location", "city": "Geneva", : "radius": "30km" }
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

input OrderBy {
  fieldName : String # eg : endTime, properties.location
  order : SortOrder
}

type AndFilter {
  arguments : [Filter]
}

input AndFilterInput {
  arguments : [FilterInput]
}

type OrFilter {
  arguments : [Filter]
}

input OrFilterInput {
  arguments : [FilterInput]
}

enum ProfilePropertyOperator {
  EQ, 
  GT,
  GTE,
  LT,
  LTE,
  BETWEEN
}

type StringProfilePropertyFilter {
  operator : ProfilePropertyOperator
  property : String
  value : String
}

input StringProfilePropertyFilterInput {
  operator : ProfilePropertyOperator
  property : String
  value : String
}

type BooleanProfilePropertyFilter {
  operator : ProfilePropertyOperator
  property : String
  value : Boolean
}

type EventOccurrenceFilter {
  eventId : String
  beforeTime : String
  afterTime : String
  betweenTime : String
  count : Int
}

input EventOccurrenceFilterInput {
  eventId : String
  beforeTime : String
  afterTime : String
  betweenTime : String
  count : Int
}

type Filter {
  and : AndFilter
  or : OrFilter
  # ....
  profileProperty : StringProfilePropertyFilter
  # profilePropertyGeoDistance : ProfilePropertyGeoDistanceFilter
  eventOccurrence : EventOccurrenceFilter
  # eventProperty : EventPropertyFilter
  # eventPropertyGeoDistance : EventPropertyGeoDistanceFilter
}

type AndEventFilter {
  and : [EventFilter]
}

type OrEventFilter {
  or : [EventFilter]
}

type EventFilter {
  and : AndEventFilter
  or : OrEventFilter

#  ... 
  eventOccurrence : EventOccurrenceFilter
  # eventProperty : EventPropertyFilter
  # eventPropertyGeoDistance : EventPropertyGeoDistanceFilter
}

type AndProfileFilter {
  and : [ProfileFilter]
}

type OrProfileFilter {
  or : [ProfileFilter]
}

type ProfileFilter {
  and : AndProfileFilter
  or : OrProfileFilter
  
  profileProperty : StringProfilePropertyFilter
  # profilePropertyGeoDistance : ProfilePropertyGeoDistanceFilter
}

input FilterInput {
  and : AndFilterInput
  or : OrFilterInput
#  ....
  profileProperty : StringProfilePropertyFilterInput
  eventOccurence : EventOccurrenceFilterInput
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

type PropertyTypeEdge {
  node : PropertyType
  cursor : String!
}

type PropertyTypeConnection {
  edges : [PropertyTypeEdge]
  pageInfo : PageInfo
}

type ProfileEdge {
  node : ProfileInterface
  cursor : String!
}

type ProfileConnection {
  totalCount: Int
  edges : [ProfileEdge]
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

type InterestEdge {
  node : Interest
  cursor: String!
}

type InterestConnection {
  totalCount: Int
  edges : [InterestEdge]
  pageInfo : PageInfo
}

# GLOBAL PROPERTY DEFINITIONS
# ----------------------------------------------------------------------------

# Example property type definitions:
#
# {
#   __typename : "SetPropertyType", 
#   name : "address",
#   multivalued : true,
#   mandatory : false,
#   identifier : false,
#   tags : [ ],
#   properties : [
#     { 
#       __typename : "StringPropertyType", 
#       name : "city",
#       multivalued : false,
#       mandatory : true,
#       identifier : false,
#       tags : [ ],
#     },
#     { 
#       __typename : "IntPropertyType", 
#       name : "postalCode",
#       multivalued : false,
#       mandatory : true,
#       identifier : false,
#       tags : [ ],
#       minValue : 0,
#       maxValue : 999999
#     }
#   ]
# } 
# 

# Roles are predefined in the CXS server implementation, no API is provided to manipulate them.
# system-admin, system-public, system-authenticated, acme-admin, test-admin
type Role {
  name : String!
  displayName : String
  scope : Scope! # may include a system scope
}

enum AppliesTo {
  PROFILE,
  EVENT,
  ALL 
}

# Multi-valued properties are controlled using the minOccurrences and maxOccurrences fields. The order of the values 
# must be preserved. Mandatory properties may be defined by setting minOccurrences to > 0
interface PropertyType {
  name : ID!
  minOccurrences : Int # default = 0
  maxOccurrences : Int # default = 1
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
}

# The identifier property type is basically a string that is used as an identifier property
type IdentifierPropertyType implements PropertyType {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  regexp : String 
  defaultValue : String
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
}

input IdentifierPropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  regexp : String 
  defaultValue : String
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
}

type StringPropertyType implements PropertyType {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  regexp : String 
  defaultValue : String
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
}

input StringPropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  regexp : String 
  defaultValue : String
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
} 

type IntPropertyType implements PropertyType {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  minValue : Int
  maxValue : Int 
  defaultValue : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
}

type FloatPropertyType implements PropertyType {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  minValue : Float
  maxValue : Float
  defaultValue : Float
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
}

# Date are in ISO-8601 format equivalent to Java 8 Instant format.
type DatePropertyType implements PropertyType {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  defaultValue : String
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
}

type BooleanPropertyType implements PropertyType {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  defaultValue : Boolean
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
}

# Maps to a String with a lat,lon format
type GeoPointPropertyType implements PropertyType {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  defaultValue : String
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
}

type SetPropertyType implements PropertyType {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
  properties : [PropertyType] 
}

input SetPropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  appliesTo : AppliesTo
  properties : [String] 
}

# MANAGEMENT OBJECTS
# ----------------------------------------------------------------------------

# Management objects are associated with a scope
type Scope {
  name: ID!
}

input ScopeInput {
  name: ID!
}

type Persona implements ProfileInterface {
  scope : Scope!
  profileIDs : [ProfileID] # the CXS server may generated a system profile ID and expose it here
  segments(scopes : [ScopeInput], first : Int, last: Int, after : String, before: String) : SegmentConnection
  interests(scopes : [ScopeInput], first : Int, last: Int, after : String, before: String) : InterestConnection
  consents : [Consent]
  lists(scopes : [ScopeInput], first : Int, last: Int, after : String, before: String) : ListConnection
  properties : ProfileProperties
}

input PersonaInput {
  scope : ScopeInput!
  profileIDs : [ProfileIDInput] # the CXS server may generated a system profile ID and expose it here
  segments : [String]
  interests : [InterestInput]
  consents : [ConsentInput]
  properties : ProfilePropertiesInput  
}

type Segment {
  scope: Scope!
  name : ID! # this can be generated from displayname, but never changed
  displayName : String
  # todo should we do this like this or should we create another condition type to do this ?  
  profileFilter : ProfileFilter
  eventFilter : EventFilter
}

#
#
# mutation createOrUpdateSegment($segment : SegmentInput) {
#   createOrUpdateSegment($segment) {
#   }
# }
#
# variables : 
# {
#   "segment": {
#      "scope": "siteA",
#      "name" : "over50_3products_last10days",
#      "displayName": "People that are over 50 and have purchased 3 products in the last 10 days",
#      "filter": 
#          "and" : [
#          { 
#            "property" : { "operator" : "GT", "property" : "profile.age", "value" : "50" }
#          },
#          {
#            "occurence": { "eventId" : "transaction", "count" : 3, "timeSpan" : "now-10d" }
#          }
#          ]
#      }
#   }
# }

input SegmentInput {
  scope: String!
  name : ID! # this can be generated from displayname, but never changed
  displayName : String
  filter : FilterInput
}

type List {
  scope: Scope!
  name : ID! # this can be generated from displayname, but never changed
  displayName : String
  
  active(first: Int, after: String, last: Int, before: String) : ProfileConnection
  inactive(first: Int, after: String, last: Int, before: String) : ProfileConnection 
}

input ListInput {
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
# 
# Predefined event types include : 
# - updating profile properties, needs to match the profile properties definitions
# - updating consent ( see http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm )
# - transaction (generic)
# - like (“user likes a product”)
# - Dislike (“visitor dislikes a comment”)
# - Abuse, “user reports abuse on a page”
# - Rate (score in percent) “user rates product 4 out of 5 stars”
# - Vote
# - Download (“user downloaded a digital product”)
# - Register/Submission
# - Login
# - Logout
# - RequestFriendship
# - AcceptFriendship
# - DenyFriendship
# - Click
# - View
# - Contribute (comment, blog etc?)
# - Conversion (purchase, download, signs up for a service
# - Session start
# - Session paused
# - Session resumed
# - Session end
# - Opt-in / opt-out of a list

type EventProperties {
  # ... properties will be updated based on the properties defined by CXS server event handlers
  # we provide some samples properties here because GraphQL doesn't allow empty types, but these are not mandatory
  like : String
}

type Event {
  id: ID!
  eventType: String!
  profileID: ProfileID!
  profile : Profile!
  object: String!
  location: String
  timestamp: String # ISO-8601 format Java 8 Instant equivalent
  properties : EventProperties 
}

# Example event input : 
# Update profile example
# { 
#   _profileID : {clientID : "salesforce", id: "12345"},
#   _timestamp : "1970-01-01T00:00:00Z",
#   _object: "12345"
#   profileUpdate : { 
#       firstName : "Serge",
#       lastName : "Huber
#   }
# }
# Page view example
# { 
#   _profileID : {clientID : "web", id: "12345"},
#   _timestamp : "1970-01-01T00:00:00Z",
#   _object: "pageID"
#   _location : "41.12,-71.34", 
#   pageView : {
#       url : "/test/test/test.html",
#       referrer : "http://www.cnn.com"
#   },
# }   
#
# Location tracking event (for example using beacons)
#
# { 
#   _profileID : {clientID : "walmartApp", id: "12345"},
#   _timestamp : "1970-01-01T00:00:00Z",
#   _object: "regionID"
#   _location : "41.12,-71.34", 
#   regionChange : {
#       type : "enter" / "exit"
#       groupName : "walmart-geneva"
#   },
# }   

input GeoPointInput {
  longitude : Float
  latitude : Float
}

input EventInput {
  _profileID: ProfileIDInput! 
  _object: String! #
  _location: [GeoPointInput] # optional
  _timestamp: Int # optional because the server can generate it if it's missing
  # the actual payload will be dynamically generated based on the properties defined by the CXS event handlers
  # pageView
  # updateProfile
  # 
}

input UpdateProfileEventInput {
  _profileID: ProfileIDInput! 
  _object: String! #
  _location: [GeoPointInput] # optional
  _timestamp: Int # optional because the server can generate it if it's missing
  firstName : String
  lastName : String
#  ...
}

input UpdateConsentEventInput {
  _profileID: ProfileIDInput! 
  _object: String! #
  _location: [GeoPointInput] # optional
  _timestamp: Int # optional because the server can generate it if it's missing
} 

#
# The event input type is dynamically updated to include all the property definitions that were
# added to the context server. Here is an example of what it could look like after a while:
#
# input EventInput {
#   _profileID: ProfileIDInput!
#   _object: String! # do we need it ?
#   _location: [GeoPointInput] # optional
#   _timestamp: Int
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
#   pageID : String,
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

# We update profiles always through events. The history of external or internal profile modifications is 
# accessible through the profile update events. CXS must also specify a way to provide 
# subscriptions on profile modifications so that external systems can retrieve the profile 
# modifications.

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

input InterestInput {
  topic : TopicInput!
  score : Float
}

# dynamically generated from property type definitions
# 
# type Location_G {
#   latitude : Float,
#   longitude : Float
# }
#
# Ex: 6A
# type SteetNumberType_G {
#   streetNumber : Int,
#   prefix : String,
#   postfix : String
# }
# 
# type Address_G {
#   streetName : String,
#   streetNumber : StreetNumberType_G,
#   citySubDivisions : [String]
#   city : String,
#   postalCode : String,
#   countrySubvisions : [String]
#   country : String
# }
#
type ProfileProperties {
  # properties must be generated dynamically from property type definitions
  # ex:
  # location : Location_G
  # address : Address_G
  # the following are just examples to make GraphQL JS schema parser happy otherwise we have an empty type
  firstName : String
  lastName : String
}

input ProfilePropertiesInput {
  # the following are just examples to make GraphQL JS schema parser happy otherwise we have an empty type
  firstName : String
  lastName : String
}

interface ProfileInterface {
  profileIDs : [ProfileID] # the CXS server may generated a system profile ID and expose it here
  segments(scopes : [ScopeInput], first : Int, last: Int, after : String, before: String) : SegmentConnection
  interests(scopes : [ScopeInput], first : Int, last: Int, after : String, before: String) : InterestConnection
  consents : [Consent]
  lists(scopes : [ScopeInput], first : Int, last: Int, after : String, before: String) : ListConnection
  properties : ProfileProperties
}

type Profile implements ProfileInterface {
  profileIDs : [ProfileID] # the CXS server may generated a system profile ID and expose it here
  events(filter : FilterInput, first : Int, last: Int, after : String, before: String) : EventConnection
  lastEvents(count : Int, profileID : ProfileIDInput) : EventConnection
  segments(scopes : [ScopeInput], first : Int, last: Int, after : String, before: String) : SegmentConnection
  interests(scopes : [ScopeInput], first : Int, last: Int, after : String, before: String) : InterestConnection
  consents : [Consent]
  lists(scopes : [ScopeInput], first : Int, last: Int, after : String, before: String) : ListConnection
  matchesConditions(conditions : [ConditionsInput]) : [ConditionsMatch] # used for personalization requirements
  properties : ProfileProperties
}

#
# Consents are given and revoked through events. This means that the CXS specification defines 
# reserved property types for providing consent grants and revocations.
#
# Do Not Track is a special case, because it cannot be handled using the content management since we cannot
# track the user connect to the context server in any way. In this case, profile ID cookies should never be 
# generated, and each new request will be treated as a separate visit.
#
# Tracking is seperated from cookie identification. For example we could have a form that has an opt-in checkbox
# to "remember" the user, but NOT tracking his behavior, so that when he fills another form, pre-fill could happen,
# or a single form submission could be handled.
#
# https://onetrust.com/nobody-likes-cookie-pop-ups-browser-based-consent-eprivacy-regulation/
#
# Can we leverage OAuth 2 autorization scopes here ? Consent types are very similar to OAuth 2 authorization scopes.
# 
# Examples:
# {
#   scope : "jahia.com",
#   type: {name:"send-to-salesforce"},
#   grant: ALLOW
#   grantDate : 3498734899
#   # no revoke date means it will not expire or defaults to system or legal standard (GDPR)
# }
# {
#   scope : "jahia.com",
#   type : {name:"newsletter-subscription-latestNews"},
#   grant: DENY
#   grantDate : 3498734899
#   # no revoke date means it will not expire or defaults to system or legal standard (GDPR)
# }
# 
# Consent Types may include:
# - tracking
# - list membership
# - newsletter membership
# - access to camera
# - access to friends / contacts data
# - access to medical records
# - send sms
# - call you
# - send personal data to third parties
# - send anonymous data to third parties

# CXS Consent types include:
# - allow tracking
# - 
# (for GDPR controllers / processors ?)

enum ConsentGrant {
    ALLOW,
    DENY,
}

# Consent types are not defined in the specification, only the format of the type identifier
# should use a URI convention. Some URIs could actually be URLs and point to real resource that would give the 
# semantics of the consent type 
type Consent {
  token : ID! # similar to OAuth 2 authorization tokens to access the consent without the profile, also useful to delete the consent
  scope : Scope
  type : String! # "//mycompany.com/consents/newsletters/weekly", "//crmcompany.com/consents/push-to-crm", "//oasis_open.org/cxs/consents/send-to-third-parties"
  grant : ConsentGrant!
  grantDate : String
  revokeDate : String  
  profile : ProfileInterface
  events : EventConnection
}

input ConsentInput {
  scope: String,
  actions : [String],
  grantDate : String,
  revokeDate : String
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

# ProfileIDs are always associated with a client as multiple profileIDs are associated with a single profile. CXS 
# server implementations may generate their own internal system IDs by defining them for a "system" client.
type ProfileID {
    client : Client
    id : ID! # unique profile identifier for the client
}

input ProfileIDInput {
    clientID : ID!
    id : ID! # unique profile identifier for the client
}

type User {
    roles : [Role]
}

type Client {
    id : ID! # the "system" client ID is reserved for the CXS context server to use for internal IDs.
    defaultUser : User
    thirdParty : Boolean # optional, indicates that the client is a third party (useful for privacy regulations such as GDPR)
}

# Conditions are used to evaluate conditions stored in other systems (such as a WCM for personalization)
input ConditionsInput {
  name : String!
  filter: FilterInput
}

type ConditionsMatch {
  name : String
  matched : Boolean
  executionTimeMillis : Int
}

# INBOUND EVENT TYPES
# ----------------------------------------------------------------------------
# Inbound event could be used to push information from the context server back to a client. An example of an inbound event could 
# include resolved locations, resolved client identification (server). Inbound events could be used for real-time personalization

type Query {

  getActiveUser : User

  getEvent(id : String!) : Event
  findEvents(filter : FilterInput, orderBy : [OrderBy], first: Int, after: String, last: Int, before: String) : EventConnection
  
  getProfile(profileID : ProfileIDInput) : Profile
  findProfiles(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : ProfileConnection
  
  getPersona(personaID : String) : Persona
  findPersonas(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : ProfileConnection
  
  getSegment(segmentID : String) : Segment
  findSegments(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : SegmentConnection

  getList(listID : String) : List
  findLists(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : ListConnection

  getTopic(topicID : String) : Topic
  findTopics(filter: FilterInput, orderBy: [OrderBy], first: Int, after: String, last: Int, before: String) : TopicConnection

  getPropertyTypes : PropertyTypeConnection
  getEventTypes : [String]
  
  # Privacy and consent
  # getAllPersonalData :   
  
}

type Mutation {

  # Events may be used to control common profiles, such as controlling privacy settings, reset interests, but mostly profile
  # changes. Mutations will not be added for this
    
  logEvents(events: [EventInput]!) : Int
    
  deleteProfile(profileID : ProfileIDInput) : Profile
  
  createOrUpdatePersona(persona : PersonaInput) : Persona
  deletePersona(personaID : String) : Persona
  
  createOrUpdateSegment(segment : SegmentInput) : Segment
  deleteSegment(segmentID : String) : Segment
  
  createOrUpdateList(list : ListInput) : List
  addProfileToList(list : ListInput, profileId : ProfileIDInput, active : Boolean) : List
  removeProfileFromList(list : ListInput, profileId : ProfileIDInput) : List
  deleteList(listID : String) : List
  
  createOrUpdateTopic(topic : TopicInput) : Topic
  deleteTopic(topicID : String) : Topic
  
  # todo these are not yet properly defined, especially the arguments
  createOrUpdateIdentifierPropertyType(identifierPropertyType : IdentifierPropertyTypeInput) : PropertyType
  createOrUpdateStringPropertyType(stringPropertyType : StringPropertyTypeInput) : PropertyType
  createOrUpdateSetPropertyType(setPropertyType : SetPropertyTypeInput) : PropertyType
  deletePropertyType(propertyTypeId : String) : Boolean
              
  # Privacy 
  deleteAllPersonalData : Boolean
}

type Subscription {
  eventListener(profileID : ProfileIDInput, filter: FilterInput) : Event!
  
  profileListener(profileID: ProfileIDInput) : Profile
  
  # jobListener(jobID: String) : JobStatus
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
        object: "objectID",
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

/*
var MyAppSchema = new GraphQLSchema({
    query: MyAppQueryRootType,
    mutation: MyAppMutationRootType
});

exports.schema = MyAppSchema;
*/

/*
 * Example of Context Server (Karaf) user configuration
 * Karaf/Unomi users.properties Authentication server 1
 * username/password
 * public/public1234
 * authenticated/authenticated1234
 * administrator/administrator1234
 *
 * Mapping of Context Server users to roles
 * public -> public role
 * authenticated -> has an authenticated role
 *
 * web client system configuration
 *   visitors group in web client -> public context server user
 *   any group/users in webclient (usually a "logged in users" group ie authentication) -> mapped to authenticated user
 *
 * Example: web user with profile-id 789
 *
 * -> authenticates against web client as a REGULAR user on Authentication Server 2
 * -> web client logins into Unomi using authenticated user
 *
 * backend client
 * internal configuration
 *   administrator
 * backend client will NOT accept authenticated requests
 *
 * Example: backend administrator with profile-id 789
 * -> authenticates against backend client as a administrator user on Authentication Server 2
 * -> backend client authenticates as the administrator user inside unomi
 *
 * The mapping configurations are contained in the configuration of each client (not in Apache Unomi but external)
 */