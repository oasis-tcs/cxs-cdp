exports.profilePropertiesSchema = `
# Profile properties are dynamically generated from all declared profile property types.
type CXS_ProfileProperties {
  # the following are just examples to make GraphQL JS schema parser happy otherwise we have an empty type
  firstName : String
  lastName : String
  location : _SampleLocation
  address : _SampleAddress
}

input CXS_ProfilePropertiesInput {
  # the following are just examples to make GraphQL JS schema parser happy otherwise we have an empty type
  firstName : String
  lastName : String
}
`;
