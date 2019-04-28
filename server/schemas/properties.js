exports.propertyTypesSchema = `
"""
This interface regroups all the common fields between properties.
"""
interface CDP_PropertyInterface {
  name : ID!
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String]
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
  enum : CDP_EnumPropertyInput
  set : CDP_SetPropertyInput
}
`;
