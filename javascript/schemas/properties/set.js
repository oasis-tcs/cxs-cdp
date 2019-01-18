exports.setPropertySchema = `
"""
Enables creation of nested property types.
"""
type CDP_SetProperty implements CDP_Property {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  properties : [CDP_Property]
}

input CDP_SetPropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  properties : [CDP_PropertyInput]
}
`;
