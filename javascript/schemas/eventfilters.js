exports.eventFiltersSchema = `
type CDP_EventFilter {
  and : [CDP_EventFilter]
  or : [CDP_EventFilter]
  id_equals : String
  cdp_clientID_equals: String
  cdp_sourceID_equals : String
  cdp_profileID_equals : String
  cdp_objectID_equals : String
  cdp_location_distance : CDP_GeoDistanceFilter
  cdp_timestamp_equals : DateTime
  cdp_timestamp_lt : DateTime
  cdp_timestamp_lte : DateTime
  cdp_timestamp_gt : DateTime
  cdp_timestamp_gte : DateTime
  cdp_topics_equals : String
  cdp_profileUpdateEvent : CDP_ProfileUpdateEventFilter
  cdp_consentUpdateEvent : CDP_ConsentUpdateEventFilter
  cdp_listsUpdateEvent : CDP_ListsUpdateEventFilter
  cdp_sessionEvent : CDP_SessionEventFilter
  # generated event types will be listed here
}

input CDP_EventFilterInput {
  and : [CDP_EventFilterInput]
  or : [CDP_EventFilterInput]
  id_equals : String
  cdp_clientID_equals: String
  cdp_sourceID_equals : String
  cdp_profileID_equals : String
  cdp_objectID_equals : String
  cdp_location_distance : CDP_GeoDistanceFilterInput
  cdp_timestamp_equals : DateTime
  cdp_timestamp_lt : DateTime
  cdp_timestamp_lte : DateTime
  cdp_timestamp_gt : DateTime
  cdp_timestamp_gte : DateTime
  cdp_profileUpdateEvent : CDP_ProfileUpdateEventFilterInput
  cdp_consentUpdateEvent : CDP_ConsentUpdateEventFilterInput
  cdp_listsUpdateEvent : CDP_ListsUpdateEventFilterInput
  cdp_sessionEvent : CDP_SessionEventFilterInput
  # generated event types will be listed here
}
`;
