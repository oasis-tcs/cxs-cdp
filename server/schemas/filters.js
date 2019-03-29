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
  after : DateTime
  before : DateTime
  includeAfter : Boolean
  includeBefore : Boolean
}

input CDP_DateFilterInput {
  after : DateTime
  before : DateTime
  includeAfter : Boolean
  includeBefore : Boolean
}

enum CDP_GeoDistanceFilterUnit {
  METERS,
  KILOMETERS,
  MILES
}

type CDP_GeoDistanceFilter {
  center : GeoPoint
  unit : CDP_GeoDistanceFilterUnit
  distance : Float
}

input CDP_GeoDistanceFilterInput {
  center : GeoPoint
  unit : CDP_GeoDistanceFilterUnit
  distance : Float
}

`;
