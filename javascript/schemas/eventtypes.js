exports.eventTypesSchema = `
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


type CDP_EventType {
  name : String!
  properties : [CDP_PropertyTypeInterface]
}

input CDP_EventTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "CDP_" prefix is reserved for built-in CXS event types
  properties : [CDP_PropertyTypeInput]
}

# Where does the stuff below fit in??
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

# Sample input types generated from ProfilePropertyType definitions
input CDP_ProfilePropertiesInput {
  firstName : String
  lastName : String
  location : Sample_LocationInput
  address : Sample_AddressInput
}

input Sample_LocationInput {
  latitude : Float,
  longitude : Float
}

# Sample of nested PropertyType
input Sample_AddressInput {
  streetName : String,
  streetNumber : Sample_StreetNumberInput,
  citySubDivisions : [String]
  city : String,
  postalCode : String,
  countrySubvisions : [String]
  country : String
}

input Sample_StreetNumberInput {
  streetNumber : Int,
  prefix : String,
  postfix : String
}

# This pre-defined event?  type is used to update a single profile consent
input CDP_UpdateConsentInput {
  consent : CDP_ConsentInput
}

# TODO: Pre-defined propertyType used to update profile list membership
input CDP_UpdateListInput {
  joinLists : [CDP_ListInput]
  leaveLists : [CDP_ListInput]
}

extend type CDP_Query {
  getEventTypes : [CDP_EventType]
}

extend type CDP_Mutation {
  createOrUpdateEventType(eventType : CDP_EventTypeInput) : CDP_EventType
  deleteEventType(eventName : ID!) : Boolean
}

`;
