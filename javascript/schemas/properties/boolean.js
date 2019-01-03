exports.booleanPropertySchema = `
type CDP_BooleanProperty implements CDP_Property {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  defaultValue : Boolean
}

input CDP_BooleanPropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  defaultValue : Boolean
}
`;
