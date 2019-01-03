exports.floatPropertySchema = `
type CDP_FloatProperty implements CDP_Property {
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

input CDP_FloatPropertyInput {
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
