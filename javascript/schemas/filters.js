exports.filtersSchema = `
"Specify filter result sort order"
enum CDP_SortOrder {
  ASC,
  DESC,
  UNSPECIFIED
}

input CDP_OrderByInput {
  fieldName : String # eg : endTime, properties.location
  order : CDP_SortOrder
}

# Named filters are used to evaluate filters against a profile - useful for building personalized experiences.
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


type CDP_ProfileEventsFilter {
  and : [CDP_ProfileEventsFilter]
  or : [CDP_ProfileEventsFilter]
  not : CDP_ProfileEventsFilter

  minimalCount : Int,
  maximalCount : Int,
  eventFilter : CDP_EventFilter
}




`;
