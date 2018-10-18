
exports.cxsGlobalSchema = `
# CUSTOM SCALAR TYPES
# ----------------------------------------------------------------------------

" We use a custom JSON scalar type for arguments that cannot be defined in this specification"
scalar JSON

# Roles are predefined in the CXS server implementation, no API is provided to manipulate them: system-admin, system-public, system-authenticated, acme-admin, test-admin
type CDP_Role {
  id : ID!
  name : String!
  displayName : String
  view : CDP_View!
}

# MANAGEMENT OBJECTS
# ----------------------------------------------------------------------------



# Event properties will be updated based on the properties defined by CXS server event handlers
type CDP_EventProperties {
  # we provide some samples properties here because GraphQL doesn't allow empty types, but these are not mandatory
  like : String
}

# This pre-defined event? type is used to update profile properties
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
