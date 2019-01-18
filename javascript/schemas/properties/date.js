exports.datePropertySchema = `
"""
Dates are in ISO-8601 format equivalent to Java 8 Instants.
"""
type CDP_DateProperty implements CDP_Property {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  defaultValue : String
}

input CDP_DatePropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  defaultValue : String
}
`;
