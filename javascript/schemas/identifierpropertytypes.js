exports.identifierPropertyTypesSchema = `
"""
The identifier property type is a string that is used as an identifier
"""
type CDP_IdentifierPropertyType implements CDP_PropertyTypeInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  regexp : String
  defaultValue : String
}

input CDP_IdentifierPropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  regexp : String
  defaultValue : String
}
`;
