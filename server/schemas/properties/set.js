exports.setPropertySchema = `
"""
Enables creation of nested property types.
"""
type CDP_SetProperty implements CDP_PropertyInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  properties : [CDP_PropertyInterface]
}

input CDP_SetPropertyInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  properties : [CDP_PropertyInput]
}
`;
