exports.stringPropertySchema = `
type CDP_StringProperty implements CDP_Property {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  regexp : String
  defaultValue : String
}

input CDP_StringPropertyInput {
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
