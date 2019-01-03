exports.eventsSchema = `
interface CDP_Event {
  id: ID!
  source : CDP_Source
  client : CDP_Client
  profileID: CDP_ProfileID!
  profile : CDP_Profile!
  object: String!
  location: String
  timestamp: String
}

"""
Event wrapper object to handle missing input inheritance in GraphQL
NB! For optimization reasons, a single EventInput may contain multiple events,
but only one of each type. ID is optional, with the exception of importing
"""
input CDP_EventInput {
  id: ID
  cdp_ClientID : String
  cdp_SourceID : String
  cdp_ProfileID: CDP_ProfileIDInput!
  cdp_Object: CDP_ObjectInput!
  cdp_Location: GeoPoint
  cdp_Timestamp: Int
  cdp_UpdateProfileEvent : CDP_UpdateProfileEvent
  cdp_UpdateConsentEvent : CDP_UpdateConsentEvent
  cdp_UpdateListsEvent : CDP_UpdateListEvent
  cdp_UpdateSessionStateEvent : CDP_UpdateSessionStateEvent
  # Sample custom EventTypes below:
  # my_pageView : MY_PageViewEventInput
  # my_addedToCart : MY_addedToCartEventInput,
  # other_crmUpdate : OTHER_crmUpdateEventInput
}

extend type CDP_Query {
  getEvent(id : String!) : CDP_Event
  findEvents(filter : CDP_EventFilterInput, orderBy : [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_EventConnection
}

extend type CDP_Mutation {
  processEvents(events: [CDP_EventInput]!) : Int
}



# The actual payload will be dynamically generated based on the root properties defined by the CXS event
# property types or predefined property types. These root properties will usually be set property types,
# allowing for complex event payloads
#
# Example event inputs
#
# Update profile example
#
# {
#   _profileID : {sourceID : "salesforce", id: "12345"},
#   _timestamp : "1970-01-01T00:00:00Z",
#   _object: "12345"
#   profileUpdate : {
#       firstName : "Serge",
#       lastName : "Huber
#   }
# }
#
# Page view example
#
# {
#   _profileID : {sourceID : "web", id: "12345"},
#   _timestamp : "1970-01-01T00:00:00Z",
#   _object: "pageID"
#   _location : "41.12,-71.34",
#   pageView : {
#       url : "/test/test/test.html",
#       referrer : "http://www.cnn.com"
#   },
# }
#
# Location tracking event (for example using beacons)
#
# {
#   _profileID : {sourceID : "walmartApp", id: "12345"},
#   _timestamp : "1970-01-01T00:00:00Z",
#   _object: "regionID"
#   _location : "41.12,-71.34",
#   regionChange : {
#       type : "enter" / "exit"
#       groupName : "walmart-geneva"
#   },
# }
#
`;
