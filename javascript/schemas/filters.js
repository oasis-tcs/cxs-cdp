exports.filtersSchema = `
"The sort order is used in CDP_OrderBy types to specify the sorting order"
enum CDP_SortOrder {
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

input CDP_OrderByInput {
  fieldName : String # eg : endTime, properties.location
  order : CDP_SortOrder
}

type CDP_ProfileEventsFilter {
  and : [CDP_ProfileEventsFilter]
  or : [CDP_ProfileEventsFilter]
  not : CDP_ProfileEventsFilter

  minimalCount : Int,
  maximalCount : Int,
  eventFilter : CDP_EventFilter
}

input CDP_ProfileEventsFilterInput {
  and : [CDP_ProfileEventsFilterInput]
  or : [CDP_ProfileEventsFilterInput]
  not : CDP_ProfileEventsFilterInput

  minimalCount : Int,
  maximalCount : Int,
  eventFilter : CDP_EventFilterInput
}

"""
This filter will contain generated fields that are concatenations of property names and operators. The values
provided here are just examples.
"""
type CDP_ProfilePropertiesFilter {

  and : [CDP_ProfilePropertiesFilter]
  or : [CDP_ProfilePropertiesFilter]

  # generated profile properties filters will be listed below
}

"""
This filter will contain generated fields that are concatenations of property names and operators. The values
provided here are just examples.
"""
input CDP_ProfilePropertiesFilterInput {

  and : [CDP_ProfilePropertiesFilterInput]
  or : CDP_ProfilePropertiesFilterInput

  # generated profile properties filters will be listed below

}

type CDP_GeoPoint {
  longitude : Float
  latitude : Float
}

input CDP_GeoPointInput {
  longitude : Float
  latitude : Float
}

enum CDP_GeoDistanceUnit {
  METERS,
  KILOMETERS,
  MILES
}

type CDP_GeoDistance {
  center : CDP_GeoPoint
  unit : CDP_GeoDistanceUnit
  distance : Float
}

input CDP_GeoDistanceInput {
  center : CDP_GeoPointInput
  unit : CDP_GeoDistanceUnit
  distance : Float
}

type CDP_DateFilter {
  after : Int
  before : Int
  includeAfter : Boolean
  includeBefore : Boolean
}

input CDP_DateFilterInput {
  after : Int
  before : Int
  includeAfter : Boolean
  includeBefore : Boolean
}

type CDP_EventFilter {
  and : [CDP_EventFilter]
  or : [CDP_EventFilter]

  id_equals : String
  sourceId_equals : String
  clientId_equals: String
  profileId_equals : String
  location_distance : CDP_GeoDistance
  timestamp_between : CDP_DateFilter

  # generate event types will be listed here
}

input CDP_EventFilterInput {
  and : [CDP_EventFilterInput]
  or : [CDP_EventFilterInput]

  id_equals : String
  sourceId_equals : String
  clientId_equals: String
  profileId_equals : String
  location_distance : CDP_GeoDistanceInput
  timestamp_between : CDP_DateFilterInput

  # generate event types will be listed here
}

type CDP_ProfileFilter {
  asString : String # optional ?

  properties : CDP_ProfilePropertiesFilter
  segments : [String]
  consents : [String]
  events : CDP_ProfileEventsFilter
}

input CDP_ProfileFilterInput {
  # Example for asString value : profile.test = 'testValue' AND eventOccurrence('pageView') = 10
  asString : String # optional ?

  properties : CDP_ProfilePropertiesFilterInput
  segments : [String]
  consents : [String]
  events : CDP_ProfileEventsFilterInput
}


type CDP_ListFilter {
  and : [CDP_ListFilter]
  or : [CDP_ListFilter]

  view_equals : String
  name_equals : String
  name_regexp : String
}

input CDP_ListFilterInput {
  and : [CDP_ListFilterInput]
  or : [CDP_ListFilterInput]

  view_equals : String
  name_equals : String
  name_regexp : String
}

type CDP_TopicFilter {
  and : [CDP_TopicFilter]
  or : [CDP_TopicFilter]

  view_equals : String
  id_equals : String
  displayName_regexp : String
}

input CDP_TopicFilterInput {
  and : [CDP_TopicFilterInput]
  or : [CDP_TopicFilterInput]

  view_equals : String
  id_equals : String
  displayName_regexp : String
}
`;
