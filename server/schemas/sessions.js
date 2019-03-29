exports.sessionsSchema = `
enum CDP_SessionState {
  START,
  STOP,
  PAUSE,
  RESUME
}

type CDP_SessionEvent implements CDP_EventInterface {
  id: ID!
  cdp_source : CDP_Source
  cdp_client : CDP_Client
  cdp_profileID: CDP_ProfileID!
  cdp_profile : CDP_Profile!
  cdp_object: CDP_Object!
  cdp_location: GeoPoint
  cdp_timestamp: DateTime
  cdp_topics : [CDP_Topic]
  state : CDP_SessionState
}

input CDP_SessionEventInput {
  state : CDP_SessionState
}

type CDP_SessionEventFilter {
  state_equals : CDP_SessionState
}

input CDP_SessionEventFilterInput {
  state_equals : CDP_SessionState
}

`;
