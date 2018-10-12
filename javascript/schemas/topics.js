exports.topicsSchema = `
type CDP_Topic {
  id : ID! # cannot change and usually server generated, although they could be imported
  view : CDP_View!
  name: String!
}

input CDP_TopicInput {
  id : ID # optional and can be server generated
  view : String!
  name: String!
}
`;
