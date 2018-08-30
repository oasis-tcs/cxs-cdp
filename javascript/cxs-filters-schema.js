
exports.cxsFiltersSchema = `

"The sort order is used in CXS_OrderBy types to specify the sorting order"
enum CXS_SortOrder {
  ASC,
  DESC,
  UNSPECIFIED
}

#
# Example queries:
# For segments:
#   profiles that are between 30 and 50 
#     and that have viewed 5 pages in the last 10 days
#   profiles that are between 30 and 50 and that are female 
#     or that have purchased 3 products in the last 10 days 
#     and never logged in 
#

input CXS_OrderByInput {
  fieldName : String # eg : endTime, properties.location
  order : CXS_SortOrder
}

type CXS_ProfileEventsFilter {
  and : [CXS_ProfileEventsFilter]
  or : [CXS_ProfileEventsFilter]
  not : CXS_ProfileEventsFilter

  minimalCount : Int,
  maximalCount : Int,
  eventFilter : CXS_EventFilter
}

input CXS_ProfileEventsFilterInput {
  and : [CXS_ProfileEventsFilterInput]
  or : [CXS_ProfileEventsFilterInput]
  not : CXS_ProfileEventsFilterInput

  minimalCount : Int,
  maximalCount : Int,
  eventFilter : CXS_EventFilterInput
}

"""
This filter will contain generated fields that are concatenations of property names and operators. The values 
provided here are just examples.
"""
type CXS_ProfilePropertiesFilter {

  and : [CXS_ProfilePropertiesFilter]
  or : [CXS_ProfilePropertiesFilter]

  # generated profile properties filters will be listed below  
}

"""
This filter will contain generated fields that are concatenations of property names and operators. The values 
provided here are just examples.
"""
input CXS_ProfilePropertiesFilterInput {

  and : [CXS_ProfilePropertiesFilterInput]
  or : CXS_ProfilePropertiesFilterInput
  
  # generated profile properties filters will be listed below  

}

type CXS_GeoPoint {
  longitude : Float
  latitude : Float
}

input CXS_GeoPointInput {
  longitude : Float
  latitude : Float
}

enum CXS_GeoDistanceUnit {
  METERS,
  KILOMETERS,
  MILES
}

type CXS_GeoDistance {
  center : CXS_GeoPoint
  unit : CXS_GeoDistanceUnit
  distance : Float
}

input CXS_GeoDistanceInput {
  center : CXS_GeoPointInput
  unit : CXS_GeoDistanceUnit
  distance : Float
}

type CXS_DateFilter {
  after : Int
  before : Int
  includeAfter : Boolean
  includeBefore : Boolean 
}

input CXS_DateFilterInput {
  after : Int
  before : Int
  includeAfter : Boolean
  includeBefore : Boolean
}

type CXS_EventFilter {
  and : [CXS_EventFilter]
  or : [CXS_EventFilter]
  
  id_equals : String
  sourceId_equals : String
  clientId_equals: String
  profileId_equals : String
  location_distance : CXS_GeoDistance
  timestamp_between : CXS_DateFilter

  # generate event types will be listed here
}

input CXS_EventFilterInput {
  and : [CXS_EventFilterInput]
  or : [CXS_EventFilterInput]

  id_equals : String
  sourceId_equals : String
  clientId_equals: String
  profileId_equals : String
  location_distance : CXS_GeoDistanceInput
  timestamp_between : CXS_DateFilterInput
  
  # generate event types will be listed here
}

type CXS_ProfileFilter {
  asString : String # optional ? 
  
  properties : CXS_ProfilePropertiesFilter
  segments : [String]
  consents : [String]
  events : CXS_ProfileEventsFilter
}

input CXS_ProfileFilterInput {
  # Example for asString value : profile.test = 'testValue' AND eventOccurrence('pageView') = 10
  asString : String # optional ? 
  
  properties : CXS_ProfilePropertiesFilterInput
  segments : [String]
  consents : [String]
  events : CXS_ProfileEventsFilterInput
}


type CXS_ListFilter {
  and : [CXS_ListFilter]
  or : [CXS_ListFilter]
  
  view_equals : String
  name_equals : String
  name_regexp : String  
}

input CXS_ListFilterInput {
  and : [CXS_ListFilterInput]
  or : [CXS_ListFilterInput]
  
  view_equals : String
  name_equals : String
  name_regexp : String  
}

type CXS_TopicFilter {
  and : [CXS_TopicFilter]
  or : [CXS_TopicFilter]
  
  view_equals : String
  id_equals : String
  displayName_regexp : String  
}

input CXS_TopicFilterInput {
  and : [CXS_TopicFilterInput]
  or : [CXS_TopicFilterInput]
  
  view_equals : String
  id_equals : String
  displayName_regexp : String  
}
`;
