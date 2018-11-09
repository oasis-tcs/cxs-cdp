exports.eventTypesSchema = `
# EVENT-RELATED TYPES
# ----------------------------------------------------------------------------
#
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


type CDP_EventType {
  name : String!
  properties : [CDP_PropertyTypeInterface]
}

input CDP_EventTypeInput {
  name : ID! # must be in a format that's acceptable as a GraphQL field name (/[_A-Za-z][_0-9A-Za-z]*/) , and we recommend to prefix it to avoid conflicts, something like acme_pageView, acme_click. The "CDP_" prefix is reserved for built-in CXS event types
  properties : [CDP_PropertyTypeInput]
}
`;
