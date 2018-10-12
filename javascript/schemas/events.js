exports.eventsSchema = `
type CDP_Event {
  id: ID!
  source : CDP_Source
  client : CDP_Client
  eventType: CDP_EventType!
  profileID: CDP_ProfileID!
  profile : CDP_Profile!
  object: String!
  location: String
  timestamp: String # ISO-8601 format Java 8 Instant equivalent
  properties : CDP_EventProperties
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

input CDP_EventInput {
  id: ID # optional, usually server-generated but could be interesting to import events
  CDP_ClientID : String
  CDP_SourceID : String
  CDP_ProfileID: CDP_ProfileIDInput!
  CDP_Object: CDP_ObjectInput!
  CDP_Location: [CDP_GeoPointInput] # optional
  CDP_Timestamp: Int # optional because the server can generate it if it's missing
  # Built-in predefined event types
  CDP_UpdateProfile : CDP_UpdateProfileInput
  CDP_UpdateConsent : CDP_UpdateConsentInput
  CDP_UpdateLists : CDP_UpdateListInput
  CDP_UpdateSessionState : CDP_UpdateSessionStateInput
  # Here below will be the generated event field based on the registered event types
  # Example of a generated event type
  pageView : PageViewInput
}
`;
