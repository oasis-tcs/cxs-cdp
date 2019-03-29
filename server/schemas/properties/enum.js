exports.enumerationPropertySchema = `
"""
The enumeration property type is a collection of unique strings that contain the possible values for the enumeration property type
"""
type CDP_EnumProperty implements CDP_PropertyInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  values : [String]
}

input CDP_EnumPropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  values : [String]
}
`;
