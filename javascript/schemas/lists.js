exports.listsSchema = `
type CDP_List {
  # The ID cannot change and is usually server generated
  id : ID!
  view: CDP_View!
  name : String!
  active(first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection
  inactive(first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection
}

input CDP_ListInput {
  id : ID #optional and can be server generated
  view: String!
  name : String!
}
`;
