exports.intPropertyTypesSchema = `
type CDP_IntPropertyType implements CDP_PropertyTypeInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  minValue : Int
  maxValue : Int
  defaultValue : Int
}

input CDP_IntPropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  minValue : Int
  maxValue : Int
  defaultValue : Int
}
`;
