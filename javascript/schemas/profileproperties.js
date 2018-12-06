exports.profilePropertiesSchema = `
"""
This type is dynamically generated from the defined profilePropertyTypes. firstName, lastName, sample_Location and sample_Address are just examples of how this might look if these profileProperties were actually defined.
"""
type CDP_ProfileProperties {
  firstName : String
  lastName : String
  sample_Location : Sample_Location
  sample_Address : Sample_Address
}

"""
Sample type generated from ProfilePropertyType definition
"""
type Sample_Location {
  latitude : Float,
  longitude : Float
}

"""
Sample type generated from ProfilePropertyType definition
"""
type Sample_StreetNumber {
  streetNumber : Int,
  prefix : String,
  postfix : String
}

"""
Sample type generated from ProfilePropertyType definition
"""
type Sample_Address {
  streetName : String,
  sample_StreetNumber : Sample_StreetNumber,
  citySubDivisions : [String]
  city : String,
  postalCode : String,
  countrySubvisions : [String]
  country : String
}
`;
