exports.profilePropertiesSchema = `
# Type is dynamically generated from profilePropertyTypes
type CDP_ProfileProperties {
  # the following are just examples to make GraphQL JS schema parser happy otherwise we have an empty type
  firstName : String
  lastName : String
  location : Sample_Location
  address : Sample_Address
}

# What is this used for??????
input CDP_ProfilePropertiesInput {
  firstName : String
  lastName : String
  location : Sample_Location
  address : Sample_Address
}

# Sample generated from ProfilePropertyType
type Sample_Location {
  latitude : Float,
  longitude : Float
}

# Sample generated from ProfilePropertyType
type Sample_StreetNumber {
  streetNumber : Int,
  prefix : String,
  postfix : String
}

# Sample of nested PropertyType
type Sample_Address {
  streetName : String,
  streetNumber : Sample_StreetNumber,
  citySubDivisions : [String]
  city : String,
  postalCode : String,
  countrySubvisions : [String]
  country : String
}
`;
