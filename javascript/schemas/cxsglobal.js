
exports.cxsGlobalSchema = `
# CUSTOM SCALAR TYPES
# ----------------------------------------------------------------------------

" We use a custom JSON scalar type for arguments that cannot be defined in this specification"
scalar JSON

# Roles are predefined in the CXS server implementation, no API is provided to manipulate them.
# system-admin, system-public, system-authenticated, acme-admin, test-admin
type CDP_Role {
  id : ID!
  name : String!
  displayName : String
  view : CDP_View! # may include a system view
}

# MANAGEMENT OBJECTS
# ----------------------------------------------------------------------------

"""
Management objects are associated with a view
"""
type CDP_View {
  name: ID!
}

input CDP_ViewInput {
  name: ID!
}



type CDP_List {
  " The ID cannot change and is usually server generated "
  id : ID! # cannot change and usually server generated
  view: CDP_View!
  name : String!

  " Active members have opted in the list "
  active(first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection
  " Inactive users have opted out of the list "
  inactive(first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection
}

input CDP_ListInput {
  id : ID # optional and can be server generated
  view: String!
  name : String!
}




"""
Event properties will be updated based on the properties defined by CXS server event handlers
"""
type CDP_EventProperties {
  # we provide some samples properties here because GraphQL doesn't allow empty types, but these are not mandatory
  like : String
}



# This pre-defined property type is used to update profile properties
input CDP_UpdateProfileInput {
  updateProperties : CDP_ProfilePropertiesInput
  removeProperties : [String]
}

# This pre-defined property type is used to update a single profile consent
input CDP_UpdateConsentInput {
  consent : CDP_ConsentInput
}

# This pre-defined property type is used to update profile list membership
input CDP_UpdateListInput {
  joinLists : [CDP_ListInput]
  leaveLists : [CDP_ListInput]
}

enum SessionState {
  START,
  STOP,
  PAUSE,
  RESUME
}

input CDP_UpdateSessionStateInput {
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


type CDP_OptimizationResult {
    name : String!
    scoredObjects : [CDP_ScoredObject]
}

type CDP_ScoredObject {
    object : CDP_Object
    score : Float
}

# Example : return list of products that the profile has viewed but not bought
input CDP_OptimizationInput {
    name : String!
    objects : [CDP_ObjectInput],
    eventOccurenceBoosts : [CDP_EventOccurenceBoostInput]
    strategy : String # unspecified, random, scoring, best first match, worst match, a/b test ?
}

# Used to boost positively/negatively the algorithm based on event type and time span
# Example : return a list of products the profile has viewed in the last year
input CDP_EventOccurenceBoostInput {
    eventType : String
    boost : Int # could be negative
    fromDate : String
    toDate : String
}

# Object is globally unique in its combination of id and collections
type CDP_Object {
    id : ID! # unique within each specified collection
    collections : [String]! # could be URIs, e.g. schema.org (http://schema.org/Product) or reverse domain naming convention (org.acme.Product)
}

input CDP_ObjectInput {
    id : ID! # unique within each specified collection
  collections : [String]! # a way of classifying objects : page, product, article
}

input CDP_AlgorithmInput {
    name : String! # similarity, bought-Together, bought-byOthers, viewed-byOthers, trending, related
    parameters : JSON # parameters can be used to filter the results of the recommendation algorithm or any other custom processing that is supported by the implementation. Parameters are specific to the algorithm.
}

input CDP_RecommendationInput {
    name : String!
    objectID : ID # this is optional since we might just want to use collections to retrieve recommendations
    collections : [String] # collections we want to use to retrieve recommendations
    size : Int # maximum number of results to retrieve
    algorithm : CDP_AlgorithmInput
}

type CDP_RecommendationResult {
    name : String!
    scoredObjects : [CDP_ScoredObject]
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

enum CDP_ConsentStatus {
    ALLOWED,
    DENIED,
    REVOKED
}

# Consent types are not defined in the specification, only the format of the type identifier
# should use a URI convention. Some URIs could actually be URLs and point to real resource that would give the
# semantics of the consent type. Types are not globally unique, a combination of view and types are globally unique
# and context server implementations may use "global" or "system" views to share types.
type CDP_Consent {
  token : ID! # similar to OAuth 2 authorization tokens to access the consent without the profile, also useful to delete the consent
  source : CDP_Source
  client : CDP_Client
  type : String! # "//mycompany.com/consents/newsletters/weekly", "//crmcompany.com/consents/push-to-crm", "//oasis_open.org/cxs/consents/send-to-third-parties"
  status : CDP_ConsentStatus!
  statusDate : String
  revokeDate : String
  profile : CDP_ProfileInterface
  events : CDP_EventConnection
}

input CDP_ConsentInput {
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


# ProfileIDs are always associated with a source as multiple profileIDs are associated with a single profile. CXS
# server implementations may generate their own internal system IDs by defining them for a "system" source.
type CDP_ProfileID {
    source : CDP_Client
    id : ID! # unique profile identifier for the source
}

input CDP_ProfileIDInput {
    clientId : ID!
    id : ID! # unique profile identifier for the source
}

type CDP_Source {
    id : ID! # the "system" source ID is reserved for the CXS context server to use for internal IDs.
    thirdParty : Boolean # optional, indicates that the source is a third party (useful for privacy regulations such as GDPR)
}

input CDP_SourceInput {
    id : ID! # the "system" source ID is reserved for the CXS context server to use for internal IDs.
    thirdParty : Boolean # optional, indicates that the source is a third party (useful for privacy regulations such as GDPR)
}

# Named filters are used to evaluate filters against a profile (for example: is this profile located in the US,
# is this profile over 30). This is very useful for example when integrating WCMs for building personalized
# experiences.
input CDP_NamedFilterInput {
  name : String!
  filter: CDP_ProfileFilterInput
}

# A result for a named filter match request.
type CDP_FilterMatch {
  name : String
  matched : Boolean
  executionTimeMillis : Int
}


type Query {

  cxs : CDP_Query

}

"Context Server GraphQL mutations"
type CDP_Mutation {
  # Events may trigger different types of operations within the context server, such as updating consents,
  # reset interests, or profile updates.
  processEvents(events: [CDP_EventInput]!) : Int

  deleteProfile(profileID : CDP_ProfileIDInput) : CDP_Profile

  createOrUpdatePersona(persona : CDP_PersonaInput) : CDP_Persona
  deletePersona(personaID : String) : CDP_Persona

  createOrUpdateSegment(segment : CDP_SegmentInput) : CDP_Segment
  deleteSegment(segmentID : String) : CDP_Segment

  createOrUpdateList(list : CDP_ListInput) : CDP_List
  addProfileToList(list : CDP_ListInput, profileID : CDP_ProfileIDInput, active : Boolean) : CDP_List
  removeProfileFromList(list : CDP_ListInput, profileID : CDP_ProfileIDInput) : CDP_List
  deleteList(listID : String) : CDP_List

  createOrUpdateTopic(topic : CDP_TopicInput) : CDP_Topic
  deleteTopic(topicID : String) : CDP_Topic

  addProfilePropertyTypes(propertyTypes : [CDP_PropertyTypeInput]) : Boolean
  deleteProfilePropertyType(propertyTypeName : ID!) : Boolean

  createOrUpdateEventType(eventType : CDP_EventTypeInput) : CDP_EventType
  deleteEventType(eventName : ID!) : Boolean

  createOrUpdateView(view: CDP_ViewInput) : CDP_View
  deleteView(viewID : ID!) : Boolean

  createOrUpdateSource(source : CDP_SourceInput) : CDP_Source
  deleteSource(sourceID : ID!) : Boolean

  # Privacy
  deleteAllPersonalData : Boolean
}

type Mutation {

  cxs : CDP_Mutation

}

"Context Server GraphQL subscriptions"
type CDP_Subscription {
  eventListener(profileID : CDP_ProfileIDInput, filter: CDP_EventFilterInput) : CDP_Event!

  profileListener(profileID: CDP_ProfileIDInput) : CDP_Profile

  # jobListener(jobID: String) : JobStatus
}

`;
