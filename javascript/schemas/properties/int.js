exports.intPropertySchema = `
type CDP_IntProperty implements CDP_Property {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  minValue : Int
  maxValue : Int
  defaultValue : Int
}

input CDP_IntPropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  minValue : Int
  maxValue : Int
  defaultValue : Int
}
`;
