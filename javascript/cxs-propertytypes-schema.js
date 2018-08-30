
exports.cxsPropertyTypesSchema = `

"""
Multi-valued properties are controlled using the minOccurrences and maxOccurrences fields. The order of the values 
must be preserved. Mandatory properties may be defined by setting minOccurrences to > 0
"""
interface CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int # default = 0
  maxOccurrences : Int # default = 1
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
}

"""
Only one field is allowed at a time, all others should be null.
"""
input CXS_PropertyTypeInput {
  identifier : CXS_IdentifierPropertyTypeInput
  string : CXS_StringPropertyTypeInput
  int : CXS_IntPropertyTypeInput
  float : CXS_FloatPropertyTypeInput
  date : CXS_DatePropertyTypeInput
  boolean : CXS_BooleanPropertyTypeInput
  geopoint : CXS_GeoPointPropertyTypeInput
  set : CXS_SetPropertyTypeInput
}

" The identifier property type is basically a string that is used as an identifier property "
type CXS_IdentifierPropertyType implements CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  regexp : String 
  defaultValue : String
}

input CXS_IdentifierPropertyTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  regexp : String 
  defaultValue : String
}

type CXS_StringPropertyType implements CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  regexp : String 
  defaultValue : String
}

input CXS_StringPropertyTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  regexp : String 
  defaultValue : String
} 

type CXS_IntPropertyType implements CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  minValue : Int
  maxValue : Int 
  defaultValue : Int
}

input CXS_IntPropertyTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  minValue : Int
  maxValue : Int 
  defaultValue : Int
}

type CXS_FloatPropertyType implements CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  minValue : Float
  maxValue : Float
  defaultValue : Float
}

input CXS_FloatPropertyTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  minValue : Float
  maxValue : Float
  defaultValue : Float
}

# Date are in ISO-8601 format equivalent to Java 8 Instant format.
type CXS_DatePropertyType implements CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  defaultValue : String
}

input CXS_DatePropertyTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  defaultValue : String
}

type CXS_BooleanPropertyType implements CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  defaultValue : Boolean
}

input CXS_BooleanPropertyTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  defaultValue : Boolean
}

# Maps to a String with a lat,lon format
type CXS_GeoPointPropertyType implements CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  defaultValue : String
}

input CXS_GeoPointPropertyTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  defaultValue : String
}

type CXS_SetPropertyType implements CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  properties : [CXS_PropertyType] 
}

input CXS_SetPropertyTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS event types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social 
  personalData : Boolean # default to true, identifiers are always personalData
  properties : [CXS_PropertyTypeInput]
}
`;