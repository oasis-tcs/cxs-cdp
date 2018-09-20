exports.topicsSchema = `
type CXS_Topic {
  id : ID! # cannot change and usually server generated, although they could be imported
  view : CXS_View!
  name: String!
}

input CXS_TopicInput {
  id : ID # optional and can be server generated
  view : String!
  name: String!
}
`;
