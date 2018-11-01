exports.eventFiltersSchema = `
type CDP_EventFilter {
  and : [CDP_EventFilter]
  or : [CDP_EventFilter]
  id_equals : String
  sourceId_equals : String
  clientId_equals: String
  profileId_equals : String
  location_distance : CDP_GeoDistance
  timestamp_between : CDP_DateFilter
  # generated event types will be listed here
}

input CDP_EventFilterInput {
  and : [CDP_EventFilterInput]
  or : [CDP_EventFilterInput]
  id_equals : String
  sourceId_equals : String
  clientId_equals: String
  profileId_equals : String
  location_distance : CDP_GeoDistanceInput
  timestamp_between : CDP_DateFilterInput
  # generated event types will be listed here
}
`;
