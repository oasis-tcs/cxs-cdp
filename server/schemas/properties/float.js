exports.floatPropertySchema = `
type CDP_FloatProperty implements CDP_PropertyInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  minValue : Float
  maxValue : Float
  defaultValue : Float
}

input CDP_FloatPropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  minValue : Float
  maxValue : Float
  defaultValue : Float
}
`;
