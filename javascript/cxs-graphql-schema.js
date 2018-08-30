
exports.cxsGlobalSchema = `

# CUSTOM SCALAR TYPES
# ----------------------------------------------------------------------------

" We use a custom JSON scalar type for arguments that cannot be defined in this specification"
scalar JSON

# Roles are predefined in the CXS server implementation, no API is provided to manipulate them.
# system-admin, system-public, system-authenticated, acme-admin, test-admin
type CXS_Role {
  id : ID!
  name : String!
  displayName : String
  view : CXS_View! # may include a system view
}

# MANAGEMENT OBJECTS
# ----------------------------------------------------------------------------

"""
Management objects are associated with a view
"""
type CXS_View {
  name: ID!
}

input CXS_ViewInput {
  name: ID!
}

type CXS_Persona implements CXS_ProfileInterface {
  id : ID!
  name : String!
  view : CXS_View!
  profileIDs : [CXS_ProfileID] # the CXS server may generated a system profile ID and expose it here
  segments(views : [CXS_ViewInput]) : [CXS_Segment]
  interests(views : [CXS_ViewInput]) : [CXS_Interest]
  consents : [CXS_Consent]
  lists(views : [CXS_ViewInput]) : [CXS_List]
  properties : CXS_ProfileProperties
  propertyTypes : [CXS_PropertyType]
}

input CXS_PersonaInput {
  id : ID #optional, may be server-generated
  name : String!
  view : CXS_ViewInput!
  profileIDs : [CXS_ProfileIDInput] # the CXS server may generated a system profile ID and expose it here
  segments : [String]
  interests : [CXS_InterestInput]
  consents : [CXS_ConsentInput]
  properties : CXS_ProfilePropertiesInput  
}

type CXS_Segment {
  id : ID!
  view: CXS_View!
  name : String!
  profiles : CXS_ProfileFilter
}

input CXS_SegmentInput {
  id : ID #optional, may be server-generated
  view : CXS_ViewInput!
  name : String
  profiles : CXS_ProfileFilterInput
}

input CXS_SegmentFilterInput {
  and : [CXS_SegmentFilterInput]
  or : [CXS_SegmentFilterInput]

  view_equals : String
  view_regexp : String
  name_equals : String
  name_regexp : String
}

type CXS_List {
  " The ID cannot change and is usually server generated "
  id : ID! # cannot change and usually server generated
  view: CXS_View!
  name : String!

  " Active members have opted in the list "
  active(first: Int, after: String, last: Int, before: String) : CXS_ProfileConnection
  " Inactive users have opted out of the list "
  inactive(first: Int, after: String, last: Int, before: String) : CXS_ProfileConnection 
}

input CXS_ListInput {
  id : ID # optional and can be server generated
  view: String!
  name : String!
}

type CXS_Topic {
  id : ID! # cannot change and usually server generated, although they could be imported
  view : CXS_View!
  name: String! 
}

input CXS_TopicInput {
  id : ID # optional and can be server generated
  view : String!
  name: String!
}

# EVENT-RELATED TYPES
# ----------------------------------------------------------------------------
# 
# Example event types include : 
# - Updating profile properties, needs to match the profile properties definitions
# - Updating consent ( see http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm )
# - Transaction (generic)
# - Like (“user likes a product”)
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

"""
Event properties will be updated based on the properties defined by CXS server event handlers
"""
type CXS_EventProperties {
  # we provide some samples properties here because GraphQL doesn't allow empty types, but these are not mandatory
  like : String
}

type CXS_Event {
  id: ID!
  source : CXS_Source
  client : CXS_Client
  eventType: CXS_EventType!
  profileID: CXS_ProfileID!
  profile : CXS_Profile!
  object: String!
  location: String
  timestamp: String # ISO-8601 format Java 8 Instant equivalent
  properties : CXS_EventProperties 
}

# The actual payload will be dynamically generated based on the root properties defined by the CXS event 
# property types or predefined property types. These root properties will usually be set property types, 
# allowing for complex event payloads
#
# Example event inputs
# 
# Update profile example
#
# { 
#   _profileID : {sourceID : "salesforce", id: "12345"},
#   _timestamp : "1970-01-01T00:00:00Z",
#   _object: "12345"
#   profileUpdate : { 
#       firstName : "Serge",
#       lastName : "Huber
#   }
# }
#
# Page view example
#
# { 
#   _profileID : {sourceID : "web", id: "12345"},
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
#   _profileID : {sourceID : "walmartApp", id: "12345"},
#   _timestamp : "1970-01-01T00:00:00Z",
#   _object: "regionID"
#   _location : "41.12,-71.34", 
#   regionChange : {
#       type : "enter" / "exit"
#       groupName : "walmart-geneva"
#   },
# }  
# 
input CXS_EventInput {
  id: ID # optional, usually server-generated but could be interesting to import events
  cxs_ClientID : String
  cxs_SourceID : String
  cxs_ProfileID: CXS_ProfileIDInput! 
  cxs_Object: CXS_ObjectInput!
  cxs_Location: [CXS_GeoPointInput] # optional
  cxs_Timestamp: Int # optional because the server can generate it if it's missing
  # Built-in predefined event types
  cxs_UpdateProfile : CXS_UpdateProfileInput
  cxs_UpdateConsent : CXS_UpdateConsentInput
  cxs_UpdateLists : CXS_UpdateListInput
  cxs_UpdateSessionState : CXS_UpdateSessionStateInput
  # Here below will be the generated event field based on the registered event types
  # Example of a generated event type
  pageView : PageViewInput
}

type CXS_EventType {
  name : String!
  properties : [CXS_PropertyType]
}

input CXS_EventTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  properties : [CXS_PropertyTypeInput]
}

# This pre-defined property type is used to update profile properties
input CXS_UpdateProfileInput {
  updateProperties : CXS_ProfilePropertiesInput
  removeProperties : [String]
}

# This pre-defined property type is used to update a single profile consent
input CXS_UpdateConsentInput {
  consent : CXS_ConsentInput
} 

# This pre-defined property type is used to update profile list membership
input CXS_UpdateListInput {
  joinLists : [CXS_ListInput]
  leaveLists : [CXS_ListInput]
}

enum SessionState {
  START,
  STOP,
  PAUSE,
  RESUME
}

input CXS_UpdateSessionStateInput {
  newState : SessionState
}

# Example of a generated type for an event type
input PageViewInput {
  pageID : String,
  pageUrl : String,
  referrer : String,
  userAgent : String
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

# Browser -- (structured event) --> Source -> Mapping -> Profile 

# Profile merges are optional in the CXS specification. They may be supported by using a property
# defined as an identifier as a merge key (multiple merge keys may of course exist) to merge multiple
# profiles. The resulting merged profile MUST contain all the source profile IDs of the merged profiles
# as well as the merged profile data. The original profiles that were merged may be flagged or deleted, 
# this is implementation specific. 

type CXS_Interest {
  topic: CXS_Topic!
  score : Float # 0.0 to 1.0
}

input CXS_InterestInput {
  topic : CXS_TopicInput!
  score : Float
}

# Sample generated property value
type _SampleLocation {
  latitude : Float,
  longitude : Float
}

# Sample generated property value
type _SampleStreetNumber {
  streetNumber : Int,
  prefix : String,
  postfix : String
}

# Sample generated property value
type _SampleAddress {
  streetName : String,
  streetNumber : _SampleStreetNumber,
  citySubDivisions : [String]
  city : String,
  postalCode : String,
  countrySubvisions : [String]
  country : String
}

# Profile properties are dynamically generated from all declared profile property types.
type CXS_ProfileProperties {
  # the following are just examples to make GraphQL JS schema parser happy otherwise we have an empty type
  firstName : String
  lastName : String
  location : _SampleLocation
  address : _SampleAddress
}

input CXS_ProfilePropertiesInput {
  # the following are just examples to make GraphQL JS schema parser happy otherwise we have an empty type
  firstName : String
  lastName : String
}

interface CXS_ProfileInterface {
  profileIDs : [CXS_ProfileID] # the CXS server may generated a system profile ID and expose it here
  segments(views : [CXS_ViewInput]) : [CXS_Segment]
  interests(views : [CXS_ViewInput]) : [CXS_Interest]
  consents : [CXS_Consent]
  lists(views : [CXS_ViewInput]) : [CXS_List]
  properties : CXS_ProfileProperties
  propertyTypes : [CXS_PropertyType]  
}

type CXS_Profile implements CXS_ProfileInterface {
  profileIDs : [CXS_ProfileID] # the CXS server may generated a system profile ID and expose it here
  events(filter : CXS_EventFilterInput, first : Int, last: Int, after : String, before: String) : CXS_EventConnection
  lastEvents(count : Int, profileID : CXS_ProfileIDInput) : CXS_EventConnection
  segments(views : [CXS_ViewInput]) : [CXS_Segment]
  interests(views : [CXS_ViewInput]) : [CXS_Interest]
  consents : [CXS_Consent]
  lists(views : [CXS_ViewInput]) : [CXS_List]
  matches(namedFilters : [CXS_NamedFilterInput]) : [CXS_FilterMatch] # used for personalization requirements
  optimize(parameters : [CXS_OptimizationInput]) : [CXS_OptimizationResult]
  recommend(parameters : [CXS_RecommendationInput]) : [CXS_RecommendationResult]
  properties : CXS_ProfileProperties
  propertyTypes : [CXS_PropertyType]  
}

type CXS_OptimizationResult {
    name : String!
    scoredObjects : [CXS_ScoredObject]
}

type CXS_ScoredObject {
    object : CXS_Object
    score : Float
}

# Example : return list of products that the profile has viewed but not bought
input CXS_OptimizationInput {
    name : String!
    objects : [CXS_ObjectInput],
    eventOccurenceBoosts : [CXS_EventOccurenceBoostInput]    
    strategy : String # unspecified, random, scoring, best first match, worst match, a/b test ?
}

# Used to boost positively/negatively the algorithm based on event type and time span
# Example : return a list of products the profile has viewed in the last year 
input CXS_EventOccurenceBoostInput {
    eventType : String
    boost : Int # could be negative 
    fromDate : String
    toDate : String
}

# Object is globally unique in its combination of id and collections 
type CXS_Object {
    id : ID! # unique within each specified collection
    collections : [String]! # could be URIs, e.g. schema.org (http://schema.org/Product) or reverse domain naming convention (org.acme.Product)
}

input CXS_ObjectInput {
    id : ID! # unique within each specified collection
  collections : [String]! # a way of classifying objects : page, product, article
}

input CXS_AlgorithmInput {
    name : String! # similarity, bought-Together, bought-byOthers, viewed-byOthers, trending, related
    parameters : JSON # parameters can be used to filter the results of the recommendation algorithm or any other custom processing that is supported by the implementation. Parameters are specific to the algorithm.
}

input CXS_RecommendationInput {
    name : String!
    objectID : ID # this is optional since we might just want to use collections to retrieve recommendations
    collections : [String] # collections we want to use to retrieve recommendations
    size : Int # maximum number of results to retrieve
    algorithm : CXS_AlgorithmInput 
}

type CXS_RecommendationResult {
    name : String!
    scoredObjects : [CXS_ScoredObject]
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
#   sourceId : "jahia.com",
#   type: {name:"send-to-salesforce"},
#   grant: ALLOW
#   grantDate : 3498734899
#   # no revoke date means it will not expire or defaults to system or legal standard (GDPR)
# }
# {
#   sourceId : "jahia.com",
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

enum CXS_ConsentStatus {
    ALLOWED,
    DENIED,
    REVOKED
}

# Consent types are not defined in the specification, only the format of the type identifier
# should use a URI convention. Some URIs could actually be URLs and point to real resource that would give the 
# semantics of the consent type. Types are not globally unique, a combination of view and types are globally unique
# and context server implementations may use "global" or "system" views to share types.
type CXS_Consent {
  token : ID! # similar to OAuth 2 authorization tokens to access the consent without the profile, also useful to delete the consent
  source : CXS_Source
  client : CXS_Client
  type : String! # "//mycompany.com/consents/newsletters/weekly", "//crmcompany.com/consents/push-to-crm", "//oasis_open.org/cxs/consents/send-to-third-parties"
  status : CXS_ConsentStatus!
  statusDate : String
  revokeDate : String  
  profile : CXS_ProfileInterface
  events : CXS_EventConnection
}

input CXS_ConsentInput {
  sourceId : String
  clientId : String
  type : String! # "//mycompany.com/consents/newsletters/weekly", "//crmcompany.com/consents/push-to-crm", "//oasis_open.org/cxs/consents/send-to-third-parties"
  status : String,
  statusDate : String,
  revokeDate : String
}

# SOURCE TYPES
# ----------------------------------------------------------------------------
# Application keys are no longer part of the specification, implementations will probably need to use 
# a concept similar to this so we leave them as example for the time being.
#type ApplicationKey {
#  source: Source!
#  label : String!
#  key: ID!
#  permissions: [String] # "createEvent", "createEventTypes", "fullAccess"
#}

type CXS_Client {
    id : ID!
    title : String
    sources : [CXS_Source] # optional
}

input CXS_ClientInput {
    id : ID!
    title : String
}

# ProfileIDs are always associated with a source as multiple profileIDs are associated with a single profile. CXS 
# server implementations may generate their own internal system IDs by defining them for a "system" source.
type CXS_ProfileID {
    source : CXS_Client
    id : ID! # unique profile identifier for the source
}

input CXS_ProfileIDInput {
    clientId : ID!
    id : ID! # unique profile identifier for the source
}

type CXS_Source {
    id : ID! # the "system" source ID is reserved for the CXS context server to use for internal IDs.
    thirdParty : Boolean # optional, indicates that the source is a third party (useful for privacy regulations such as GDPR)
}

input CXS_SourceInput {
    id : ID! # the "system" source ID is reserved for the CXS context server to use for internal IDs.
    thirdParty : Boolean # optional, indicates that the source is a third party (useful for privacy regulations such as GDPR)
}

# Named filters are used to evaluate filters against a profile (for example: is this profile located in the US, 
# is this profile over 30). This is very useful for example when integrating WCMs for building personalized 
# experiences.
input CXS_NamedFilterInput {
  name : String!
  filter: CXS_ProfileFilterInput
}

# A result for a named filter match request.
type CXS_FilterMatch {
  name : String
  matched : Boolean
  executionTimeMillis : Int
}

type CXS_Query {

  getEventTypes : [CXS_EventType]
  getEvent(id : String!) : CXS_Event
  findEvents(filter : CXS_EventFilterInput, orderBy : [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_EventConnection
  
  getProfile(profileID : CXS_ProfileIDInput, createIfMissing: Boolean) : CXS_Profile
  findProfiles(filter: CXS_ProfileFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_ProfileConnection
  
  getPersona(personaID : String) : CXS_Persona
  findPersonas(filter: CXS_ProfileFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_ProfileConnection
  
  getSegment(segmentID : ID) : CXS_Segment
  findSegments(filter: CXS_SegmentFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_SegmentConnection

  getList(listID : ID) : CXS_List
  findLists(filter: CXS_ListFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_ListConnection

  getTopic(topicID : ID) : CXS_Topic
  findTopics(filter: CXS_TopicFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_TopicConnection

  getProfilePropertyTypes : CXS_PropertyTypeConnection
  
  getViews : [CXS_View]
  
  getSources : [CXS_Source]
}

# Context Server GraphQL queries
type Query {

  cxs : CXS_Query
    
}

type CXS_Mutation {
  # Events may trigger different types of operations within the context server, such as updating consents, 
  # reset interests, or profile updates.   
  processEvents(events: [CXS_EventInput]!) : Int
    
  deleteProfile(profileID : CXS_ProfileIDInput) : CXS_Profile
  
  createOrUpdatePersona(persona : CXS_PersonaInput) : CXS_Persona
  deletePersona(personaID : String) : CXS_Persona
  
  createOrUpdateSegment(segment : CXS_SegmentInput) : CXS_Segment
  deleteSegment(segmentID : String) : CXS_Segment
  
  createOrUpdateList(list : CXS_ListInput) : CXS_List
  addProfileToList(list : CXS_ListInput, profileID : CXS_ProfileIDInput, active : Boolean) : CXS_List
  removeProfileFromList(list : CXS_ListInput, profileID : CXS_ProfileIDInput) : CXS_List
  deleteList(listID : String) : CXS_List
  
  createOrUpdateTopic(topic : CXS_TopicInput) : CXS_Topic
  deleteTopic(topicID : String) : CXS_Topic
  
  addProfilePropertyTypes(propertyTypes : [CXS_PropertyTypeInput]) : Boolean
  deleteProfilePropertyType(propertyTypeName : ID!) : Boolean
  
  createOrUpdateEventType(eventType : CXS_EventTypeInput) : CXS_EventType
  deleteEventType(eventName : ID!) : Boolean
            
  createOrUpdateView(view: CXS_ViewInput) : CXS_View
  deleteView(viewID : ID!) : Boolean
  
  createOrUpdateSource(source : CXS_SourceInput) : CXS_Source
  deleteSource(sourceID : ID!) : Boolean
              
  # Privacy 
  deleteAllPersonalData : Boolean
}

# Context Server GraphQL mutations
type Mutation {

  cxs : CXS_Mutation

}

type CXS_Subscription {
  eventListener(profileID : CXS_ProfileIDInput, filter: CXS_EventFilterInput) : CXS_Event!
  
  profileListener(profileID: CXS_ProfileIDInput) : CXS_Profile
  
  # jobListener(jobID: String) : JobStatus
}

type Subscription {

  cxs : CXS_Subscription
}

`;
