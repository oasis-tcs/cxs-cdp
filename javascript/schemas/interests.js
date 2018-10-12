exports.interestsSchema = `
type CDP_Interest {
  topic: CDP_Topic!
  score : Float # 0.0 to 1.0
}

input CDP_InterestInput {
  topic : CDP_TopicInput!
  score : Float
}
`;
