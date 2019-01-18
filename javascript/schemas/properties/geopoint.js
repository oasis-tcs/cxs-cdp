exports.geoPointPropertySchema = `
"""
Geopoints map to a String in lat,lon format
"""
type CDP_GeoPointProperty implements CDP_Property {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  defaultValue : String
}

input CDP_GeoPointPropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  defaultValue : String
}
`;
