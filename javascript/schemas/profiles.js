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
  _profileIDs : [CDP_ProfileID]
  _segments(views : [CDP_ViewInput]) : [CDP_Segment]
  _interests(views : [CDP_ViewInput]) : [CDP_Interest]
  _consents : [CDP_Consent]
  _lists(views : [CDP_ViewInput]) : [CDP_List]
}

type CDP_Profile implements CDP_ProfileInterface {
  _profileIDs : [CDP_ProfileID]
  _events(filter : CDP_EventFilterInput, first : Int, last: Int, after : String, before: String) : CDP_EventConnection
  _lastEvents(count : Int, profileID : CDP_ProfileIDInput) : CDP_EventConnection
  _segments(views : [CDP_ViewInput]) : [CDP_Segment]
  _interests(views : [CDP_ViewInput]) : [CDP_Interest]
  _consents : [CDP_Consent]
  _lists(views : [CDP_ViewInput]) : [CDP_List]
  _matches(namedFilters : [CDP_NamedFilterInput]) : [CDP_FilterMatch]
  _optimize(parameters : [CDP_OptimizationInput]) : [CDP_OptimizationResult]
  _recommend(parameters : [CDP_RecommendationInput]) : [CDP_RecommendationResult]
  # fields will be added here according to registered profile properties  
}

type CDP_ProfileUpdateEvent implements CDP_EventInterface {
  id: ID!
  _source : CDP_Source
  _client : CDP_Client
  _profileID: CDP_ProfileID!
  _profile : CDP_Profile!
  _object: CDP_Object!
  _location: GeoPoint
  _timestamp: DateTime
  _topics : [CDP_Topic]
  # fields will be added here according to registered profile properties. To remove a property value pass a null value
}

"CDP standard eventType used to update profile properties"
input CDP_ProfileUpdateEventInput {
  "Please disregard the underscore field, it is only there because GraphQL schema doesn't allow empty types"
  _ : EmptyTypeWorkAround
  # input fields will be added here according to registered profile properties  
}

type CDP_ProfileUpdateEventFilter {
  "Please disregard the underscore field, it is only there because GraphQL schema doesn't allow empty types"
  _ : EmptyTypeWorkAround
  # fields will be added here according to registered profile properties  
}

input CDP_ProfileUpdateEventFilterInput {
  "Please disregard the underscore field, it is only there because GraphQL schema doesn't allow empty types"
  _ : EmptyTypeWorkAround
  # input fields will be added here according to registered profile properties  
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

extend type CDP_Subscription {
  profileListener(filter: CDP_ProfileFilterInput) : CDP_Profile
}

`;
