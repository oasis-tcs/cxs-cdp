exports.interestsSchema = `
type CXS_Interest {
  topic: CXS_Topic!
  score : Float # 0.0 to 1.0
}

input CXS_InterestInput {
  topic : CXS_TopicInput!
  score : Float
}
`;
