exports.profilesSchema = `
interface CDP_ProfileInterface {
  profileIDs : [CDP_ProfileID] # the CXS server may generated a system profile ID and expose it here
  segments(views : [CDP_ViewInput]) : [CDP_Segment]
  interests(views : [CDP_ViewInput]) : [CDP_Interest]
  consents : [CDP_Consent]
  lists(views : [CDP_ViewInput]) : [CDP_List]
  properties : CDP_ProfileProperties
  propertyTypes : [CDP_PropertyTypeInterface]
}

# ProfileIDs uniquely identify a profile within a source
type CDP_ProfileID {
    source : CDP_Source!
    id : ID! # unique profile identifier within source
}

input CDP_ProfileIDInput {
    source : CDP_SourceInput!
    id : ID! # unique profile identifier for the source
}

type CDP_Profile implements CDP_ProfileInterface {
  profileIDs : [CDP_ProfileID] # the CXS server may generated a system profile ID and expose it here
  events(filter : CDP_EventFilterInput, first : Int, last: Int, after : String, before: String) : CDP_EventConnection
  lastEvents(count : Int, profileID : CDP_ProfileIDInput) : CDP_EventConnection
  segments(views : [CDP_ViewInput]) : [CDP_Segment]
  interests(views : [CDP_ViewInput]) : [CDP_Interest]
  consents : [CDP_Consent]
  lists(views : [CDP_ViewInput]) : [CDP_List]
  matches(namedFilters : [CDP_NamedFilterInput]) : [CDP_FilterMatch] # used for personalization requirements
  optimize(parameters : [CDP_OptimizationInput]) : [CDP_OptimizationResult]
  recommend(parameters : [CDP_RecommendationInput]) : [CDP_RecommendationResult]
  properties : CDP_ProfileProperties
  propertyTypes : [CDP_PropertyTypeInterface]
}

extend type CDP_Query {
  getProfile(profileID : CDP_ProfileIDInput, createIfMissing: Boolean) : CDP_Profile
  findProfiles(filter: CDP_ProfileFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection
  getProfilePropertyTypes : CDP_PropertyTypeConnection
}

extend type CDP_Mutation {
  createOrUpdateProfilePropertyTypes(propertyTypes : [CDP_PropertyTypeInput]) : Boolean
  deleteProfilePropertyType(propertyTypeName : ID!) : Boolean
  deleteProfile(profileID : CDP_ProfileIDInput) : CDP_Profile
}





`;
