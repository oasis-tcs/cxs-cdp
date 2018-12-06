exports.filtersSchema = `
enum CDP_SortOrder {
  ASC,
  DESC,
  UNSPECIFIED
}

input CDP_OrderByInput {
  fieldName : String
  order : CDP_SortOrder
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

enum CDP_GeoDistanceUnit {
  METERS,
  KILOMETERS,
  MILES
}

type CDP_GeoDistance {
  center : GeoPoint
  unit : CDP_GeoDistanceUnit
  distance : Float
}

input CDP_GeoDistanceInput {
  center : GeoPoint
  unit : CDP_GeoDistanceUnit
  distance : Float
}

`;
