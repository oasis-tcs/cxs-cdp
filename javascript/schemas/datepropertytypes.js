exports.datePropertyTypesSchema = `
"""
Dates are in ISO-8601 format equivalent to Java 8 Instants.
"""
type CDP_DatePropertyType implements CDP_PropertyTypeInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  defaultValue : String
}

input CDP_DatePropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  defaultValue : String
}
`;
