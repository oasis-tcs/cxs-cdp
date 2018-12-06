exports.booleanPropertyTypesSchema = `
type CDP_BooleanPropertyType implements CDP_PropertyTypeInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  defaultValue : Boolean
}

input CDP_BooleanPropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  defaultValue : Boolean
}
`;
