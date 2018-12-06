exports.geoPointPropertyTypesSchema = `
"""
Geopoints map to a String in lat,lon format
"""
type CDP_GeoPointPropertyType implements CDP_PropertyTypeInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  defaultValue : String
}

input CDP_GeoPointPropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  defaultValue : String
}
`;
