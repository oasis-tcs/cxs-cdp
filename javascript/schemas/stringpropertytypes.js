exports.stringPropertyTypesSchema = `
type CDP_StringPropertyType implements CDP_PropertyTypeInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  regexp : String
  defaultValue : String
}

input CDP_StringPropertyTypeInput {
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
