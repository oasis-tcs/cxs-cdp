exports.eventsSchema = `
type CXS_Event {
  id: ID!
  source : CXS_Source
  client : CXS_Client
  eventType: CXS_EventType!
  profileID: CXS_ProfileID!
  profile : CXS_Profile!
  object: String!
  location: String
  timestamp: String # ISO-8601 format Java 8 Instant equivalent
  properties : CXS_EventProperties
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

input CXS_EventInput {
  id: ID # optional, usually server-generated but could be interesting to import events
  cxs_ClientID : String
  cxs_SourceID : String
  cxs_ProfileID: CXS_ProfileIDInput!
  cxs_Object: CXS_ObjectInput!
  cxs_Location: [CXS_GeoPointInput] # optional
  cxs_Timestamp: Int # optional because the server can generate it if it's missing
  # Built-in predefined event types
  cxs_UpdateProfile : CXS_UpdateProfileInput
  cxs_UpdateConsent : CXS_UpdateConsentInput
  cxs_UpdateLists : CXS_UpdateListInput
  cxs_UpdateSessionState : CXS_UpdateSessionStateInput
  # Here below will be the generated event field based on the registered event types
  # Example of a generated event type
  pageView : PageViewInput
}
`;
