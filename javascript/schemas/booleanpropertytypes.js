exports.booleanPropertyTypesSchema = `
type CXS_BooleanPropertyType implements CXS_PropertyType {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social
  personalData : Boolean # default to true, identifiers are always personalData
  defaultValue : Boolean
}

input CXS_BooleanPropertyTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "cxs_" prefix is reserved for built-in CXS types
  minOccurrences : Int
  maxOccurrences : Int
  tags : [String] # user generated tags
  systemTags : [String] # personalInformation, address, social
  personalData : Boolean # default to true, identifiers are always personalData
  defaultValue : Boolean
}
`;
