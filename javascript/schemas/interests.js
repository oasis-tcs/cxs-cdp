exports.interestsSchema = `
type CDP_Interest {
  topic: CDP_Topic!
  score : Float
}

input CDP_InterestInput {
  topic : CDP_TopicInput!
  score : Float
}

type CDP_InterestFilter {
  and : [CDP_InterestFilter]
  or : [CDP_InterestFilter] 
  topic_equals : ID
  score_equals : Float
  score_lt : Float
  score_lte : Float
  score_gt : Float
  score_gte : Float
}

input CDP_InterestFilterInput {
  and : [CDP_InterestFilterInput]
  or : [CDP_InterestFilterInput] 
  topic_equals : ID
  score_equals : Float
  score_lt : Float
  score_lte : Float
  score_gt : Float
  score_gte : Float
}

`;
