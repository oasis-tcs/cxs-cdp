exports.sessionsSchema = `
enum CDP_SessionState {
  START,
  STOP,
  PAUSE,
  RESUME
}

input CDP_UpdateSessionStateEvent {
  newState : CDP_SessionState
}
`;
