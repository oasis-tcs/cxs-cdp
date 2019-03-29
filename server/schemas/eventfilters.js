exports.eventFiltersSchema = `
type CDP_EventFilter {
  and : [CDP_EventFilter]
  or : [CDP_EventFilter]
  id_equals : String
  _clientId_equals: String
  _sourceId_equals : String
  _profileId_equals : String
  _objectId_equals : String
  _location_distance : CDP_GeoDistanceFilter
  _timestamp_equals : DateTime
  _timestamp_lt : DateTime
  _timestamp_lte : DateTime
  _timestamp_gt : DateTime
  _timestamp_gte : DateTime
  _topics_equals : String
  _profileUpdateEvent : CDP_ProfileUpdateEventFilter
  _consentUpdateEvent : CDP_ConsentUpdateEventFilter
  _listsUpdateEvent : CDP_ListsUpdateEventFilter
  _sessionEvent : CDP_SessionEventFilter
  # generated event types will be listed here
}

input CDP_EventFilterInput {
  and : [CDP_EventFilterInput]
  or : [CDP_EventFilterInput]
  id_equals : String
  _clientId_equals: String
  _sourceId_equals : String
  _profileId_equals : String
  _objectId_equals : String
  _location_distance : CDP_GeoDistanceFilterInput
  _timestamp_equals : DateTime
  _timestamp_lt : DateTime
  _timestamp_lte : DateTime
  _timestamp_gt : DateTime
  _timestamp_gte : DateTime
  _profileUpdateEvent : CDP_ProfileUpdateEventFilterInput
  _consentUpdateEvent : CDP_ConsentUpdateEventFilterInput
  _listsUpdateEvent : CDP_ListsUpdateEventFilterInput
  _sessionEvent : CDP_SessionEventFilterInput
  # generated event types will be listed here
}
`;
