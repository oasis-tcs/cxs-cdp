exports.setPropertyTypesSchema = `
"""
Enables creation of nested property types.
"""
type CDP_SetPropertyType implements CDP_PropertyTypeInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  properties : [CDP_PropertyTypeInterface]
}

input CDP_SetPropertyTypeInput {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
  properties : [CDP_PropertyTypeInput]
}
`;
