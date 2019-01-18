exports.enumerationPropertySchema = `
"""
The enumeration property type is a collection of unique strings that contain the possible values for the enumeration property type
"""
type CDP_EnumerationProperty implements CDP_Property{
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  values : [String]
}

input CDP_EnumerationPropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  values : [String]
}
`;
