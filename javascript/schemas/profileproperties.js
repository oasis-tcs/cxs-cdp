exports.profilePropertiesSchema = `
# Profile properties are dynamically generated from all declared profile property types.
type CDP_ProfileProperties {
  # the following are just examples to make GraphQL JS schema parser happy otherwise we have an empty type
  firstName : String
  lastName : String
  location : _SampleLocation
  address : _SampleAddress
}

input CDP_ProfilePropertiesInput {
  # the following are just examples to make GraphQL JS schema parser happy otherwise we have an empty type
  firstName : String
  lastName : String
}
`;
