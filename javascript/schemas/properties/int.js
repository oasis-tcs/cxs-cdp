exports.intPropertySchema = `
type CDP_IntProperty implements CDP_PropertyInterface {
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

input CDP_IntPropertyInput {
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
