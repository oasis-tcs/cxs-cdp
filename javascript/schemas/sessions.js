exports.sessionsSchema = `
enum CDP_SessionState {
  START,
  STOP,
  PAUSE,
  RESUME
}

type CDP_UpdateSessionStateEvent implements CDP_Event {
  id: ID!
  _source : CDP_Source
  _client : CDP_Client
  _profileID: CDP_ProfileID!
  _profile : CDP_Profile!
  _object: String!
  _location: String
  _timestamp: DateTime
  state : CDP_SessionState
}

input CDP_UpdateSessionStateEventInput {
  newState : CDP_SessionState
}
`;
