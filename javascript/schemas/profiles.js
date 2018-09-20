exports.profilesSchema = `
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
`;
