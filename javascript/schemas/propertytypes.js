exports.propertyTypesSchema = `
"""
TODO: Nice description on why we have this interface
"""
interface CDP_PropertyTypeInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
  systemTags : [String]
  personalData : Boolean
}

"""
Workaround for missing GraphQL inheritance, only one field allowed at a time, all others should be null.
"""
input CDP_PropertyTypeInput {
  identifier : CDP_IdentifierPropertyTypeInput
  string : CDP_StringPropertyTypeInput
  int : CDP_IntPropertyTypeInput
  float : CDP_FloatPropertyTypeInput
  date : CDP_DatePropertyTypeInput
  boolean : CDP_BooleanPropertyTypeInput
  geopoint : CDP_GeoPointPropertyTypeInput
  set : CDP_SetPropertyTypeInput
}
`;
