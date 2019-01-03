exports.profilesSchema = `
"""
ProfileIDs uniquely identify a profile within a source
"""
type CDP_ProfileID {
    source : CDP_Source!
    id : ID!
}

input CDP_ProfileIDInput {
    source : CDP_SourceInput!
    id : ID!
}

"""
Common interface for both profiles and personas
"""
interface CDP_ProfileInterface {
  profileIDs : [CDP_ProfileID]
  segments(views : [CDP_ViewInput]) : [CDP_Segment]
  interests(views : [CDP_ViewInput]) : [CDP_Interest]
  consents : [CDP_Consent]
  lists(views : [CDP_ViewInput]) : [CDP_List]
  properties : CDP_ProfileProperties
}

"""
This type is dynamically generated from the defined ProfileProperties. firstName, lastName, sample_Location and sample_Address are just examples of how this might look if these profileProperties were actually defined.
"""
type CDP_ProfileProperties {
  "Please disregard the underscore field, it is only there because GraphQL schema doesn't allow empty types"
  _ : EmptyTypeWorkAround
}

"Input type generated from available ProfileProperties"
input CDP_ProfilePropertiesInput {
  "Please disregard the underscore field, it is only there because GraphQL schema doesn't allow empty types"
  _ : EmptyTypeWorkAround
}

type CDP_Profile implements CDP_ProfileInterface {
  profileIDs : [CDP_ProfileID]
  events(filter : CDP_EventFilterInput, first : Int, last: Int, after : String, before: String) : CDP_EventConnection
  lastEvents(count : Int, profileID : CDP_ProfileIDInput) : CDP_EventConnection
  segments(views : [CDP_ViewInput]) : [CDP_Segment]
  interests(views : [CDP_ViewInput]) : [CDP_Interest]
  consents : [CDP_Consent]
  lists(views : [CDP_ViewInput]) : [CDP_List]
  matches(namedFilters : [CDP_NamedFilterInput]) : [CDP_FilterMatch]
  optimize(parameters : [CDP_OptimizationInput]) : [CDP_OptimizationResult]
  recommend(parameters : [CDP_RecommendationInput]) : [CDP_RecommendationResult]
  properties : CDP_ProfileProperties
}

"CDP standard eventType used to update profile properties"
input CDP_UpdateProfileEventInput {
  updateProperties : CDP_ProfilePropertiesInput
  removeProperties : [String]
}

extend type CDP_Query {
  getProfile(profileID : CDP_ProfileIDInput, createIfMissing: Boolean) : CDP_Profile
  findProfiles(filter: CDP_ProfileFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection
  getProfileProperties : CDP_PropertyConnection
}

extend type CDP_Mutation {
  createOrUpdateProfileProperties(properties : [CDP_PropertyInput]) : Boolean
  deleteProfileProperties(propertyNames : [ID]!) : Boolean
  deleteProfile(profileID : CDP_ProfileIDInput) : CDP_Profile
}





`;
