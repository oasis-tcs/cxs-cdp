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

extend type CDP_Query {
  getList(listID : ID) : CDP_List
  findLists(filter: CDP_ListFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_ListConnection
}

extend type CDP_Mutation {
  createOrUpdateList(list : CDP_ListInput) : CDP_List
  addProfileToList(list : CDP_ListInput, profileID : CDP_ProfileIDInput, active : Boolean) : CDP_List
  removeProfileFromList(list : CDP_ListInput, profileID : CDP_ProfileIDInput) : CDP_List
  deleteList(listID : String) : CDP_List
}
`;
