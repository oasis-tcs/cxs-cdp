exports.interestsSchema = `
type CDP_Interest {
  topic: CDP_Topic!
  score : Float
}

input CDP_InterestInput {
  topic : CDP_TopicInput!
  score : Float
}
`;
