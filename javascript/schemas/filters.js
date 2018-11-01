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

`;
