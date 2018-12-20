exports.propertyTypesSchema = `
"""
TODO: Nice description on why we have this interface
"""
interface CDP_PropertyInterface {
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
input CDP_PropertyInput {
  identifier : CDP_IdentifierPropertyInput
  string : CDP_StringPropertyInput
  int : CDP_IntPropertyInput
  float : CDP_FloatPropertyInput
  date : CDP_DatePropertyInput
  boolean : CDP_BooleanPropertyInput
  geopoint : CDP_GeoPointPropertyInput
  set : CDP_SetPropertyInput
}
`;
