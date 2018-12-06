exports.floatPropertyTypesSchema = `
type CDP_FloatPropertyType implements CDP_PropertyTypeInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  minValue : Float
  maxValue : Float
  defaultValue : Float
}

input CDP_FloatPropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  minValue : Float
  maxValue : Float
  defaultValue : Float
}
`;
