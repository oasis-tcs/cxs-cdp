exports.profilesSchema = `
"""
ProfileIDs uniquely identify a profile within a source
"""
type CDP_ProfileID {
    client : CDP_Client!
    id : ID!
    uri : ID # "cdp_profile:source/id"
}

input CDP_ProfileIDInput {
    clientID : ID!
    id : ID!
}

"""
Common interface for both profiles and personas
"""
interface CDP_ProfileInterface {
  cdp_profileIDs : [CDP_ProfileID]
  cdp_segments(views : [ID]) : [CDP_Segment]
  cdp_interests(views : [ID]) : [CDP_Interest]
  cdp_consents : [CDP_Consent]
  cdp_lists(views : [ID]) : [CDP_List]
}

type CDP_Profile implements CDP_ProfileInterface {
  cdp_profileIDs : [CDP_ProfileID]
  cdp_events(filter : CDP_EventFilterInput, first : Int, last: Int, after : String, before: String) : CDP_EventConnection
  cdp_lastEvents(count : Int, profileID : CDP_ProfileIDInput) : CDP_EventConnection
  cdp_segments(views : [ID]) : [CDP_Segment]
  cdp_interests(views : [ID]) : [CDP_Interest]
  cdp_consents : [CDP_Consent]
  cdp_lists(views : [ID]) : [CDP_List]
  cdp_matches(namedFilters : [CDP_NamedFilterInput]) : [CDP_FilterMatch]
  cdp_optimize(parameters : [CDP_OptimizationInput]) : [CDP_OptimizationResult]
  cdp_recommend(parameters : [CDP_RecommendationInput]) : [CDP_RecommendationResult]  
  # fields will be added here according to registered profile properties  
}

type CDP_ProfileUpdateEvent implements CDP_EventInterface {
  id: ID!
  cdp_source : CDP_Source
  cdp_client : CDP_Client
  cdp_profileID: CDP_ProfileID!
  cdp_profile : CDP_Profile!
  cdp_object: CDP_Object!
  cdp_location: GeoPoint
  cdp_timestamp: DateTime
  cdp_topics : [CDP_Topic]
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
  deleteAllPersonalData(profileID : CDP_ProfileIDInput) : Boolean
}

extend type CDP_Subscription {
  profileListener(filter: CDP_ProfileFilterInput) : CDP_Profile
}

`;
