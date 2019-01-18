exports.eventFiltersSchema = `
type CDP_EventFilter {
  and : [CDP_EventFilter]
  or : [CDP_EventFilter]
  id_equals : String
  _sourceId_equals : String
  _clientId_equals: String
  _profileId_equals : String
  _location_distance : CDP_GeoDistanceFilter
  _timestamp_between : CDP_DateFilter
  # generated event types will be listed here
}

input CDP_EventFilterInput {
  and : [CDP_EventFilterInput]
  or : [CDP_EventFilterInput]
  id_equals : String
  _sourceId_equals : String
  _clientId_equals: String
  _profileId_equals : String
  _location_distance : CDP_GeoDistanceFilterInput
  _timestamp_between : CDP_DateFilterInput
  # generated event types will be listed here
}
`;
