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

extend type CDP_Query {
  getTopic(topicID : ID) : CDP_Topic
  findTopics(filter: CDP_TopicFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_TopicConnection
}

extend type CDP_Mutation {
  createOrUpdateTopic(topic : CDP_TopicInput) : CDP_Topic
  deleteTopic(topicID : String) : CDP_Topic
}
`;
