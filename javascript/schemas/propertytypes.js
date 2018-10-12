exports.propertyTypesSchema = `
"""
Multi-valued properties are controlled using the minOccurrences and maxOccurrences fields. The order of the values
must be preserved. Mandatory properties may be defined by setting minOccurrences to > 0
"""
interface CDP_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "CDP_" prefix is reserved for built-in CXS event types
  minOccurrences : Int # default = 0
  maxOccurrences : Int # default = 1
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social
  personalData : Boolean # default to true, identifiers are always personalData
}

"""
Only one field is allowed at a time, all others should be null.
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
