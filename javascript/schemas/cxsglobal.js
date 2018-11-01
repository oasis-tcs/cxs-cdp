
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


type Query {
  cxs : CDP_Query
}


type Mutation {

  cxs : CDP_Mutation

}

type Subscription {

  cxs : CDP_Subscription
}


`;
