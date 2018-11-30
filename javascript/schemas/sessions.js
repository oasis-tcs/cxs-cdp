exports.sessionsSchema = `
enum CDP_SessionState {
  START,
  STOP,
  PAUSE,
  RESUME
}

input CDP_UpdateSessionStateInput {
  newState : CDP_SessionState
}
`;
