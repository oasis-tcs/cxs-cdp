exports.identifierPropertySchema = `
"""
The identifier property type is a string that is used as an identifier
"""
type CDP_IdentifierProperty implements CDP_Property{
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  regexp : String
  defaultValue : String
}

input CDP_IdentifierPropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  regexp : String
  defaultValue : String
}
`;
