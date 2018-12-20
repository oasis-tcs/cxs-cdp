exports.eventTypesSchema = `
# EVENT-RELATED TYPES
# ----------------------------------------------------------------------------
# Example event types include :
# - Updating profile properties, needs to match the profile properties definitions
# - Updating consent ( see http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm )
# - Transaction (generic)
# - Like (“user likes a product”)
# - Dislike (“visitor dislikes a comment”)
# - Abuse, “user reports abuse on a page”
# - Rate (score in percent) “user rates product 4 out of 5 stars”
# - Vote
# - Download (“user downloaded a digital product”)
# - Register/Submission
# - Login
# - Logout
# - RequestFriendship
# - AcceptFriendship
# - DenyFriendship
# - Click
# - View
# - Contribute (comment, blog etc?)
# - Conversion (purchase, download, signs up for a service
# - Session start
# - Session paused
# - Session resumed
# - Session end
# - Opt-in / opt-out of a list

"CDP standard eventType used to update a single profiles concent"
input CDP_UpdateConsentInput {
  consent : CDP_ConsentInput
}

"CDP standard eventType used to update profile list memberships"
input CDP_UpdateListInput {
  joinLists : [CDP_ListInput]
  leaveLists : [CDP_ListInput]
}

"CDP standard eventType used to update profile properties"
input CDP_UpdateProfileInput {
  updateProperties : CDP_ProfilePropertiesInput
  removeProperties : [String]
}

"Sample input type generated from available ProfilePropertiess"
input CDP_ProfilePropertiesInput {
  firstName : String
  lastName : String
  location : Sample_LocationInput
  address : Sample_AddressInput
}

"Sample input type generated for location PropertyType"
input Sample_LocationInput {
  latitude : Float,
  longitude : Float
}

"Sample of nested PropertyType"
input Sample_AddressInput {
  streetName : String,
  streetNumber : Sample_StreetNumberInput,
  citySubDivisions : [String]
  city : String,
  postalCode : String,
  countrySubvisions : [String]
  country : String
}

"Sample PropertyType"
input Sample_StreetNumberInput {
  streetNumber : Int,
  prefix : String,
  postfix : String
}

`;
