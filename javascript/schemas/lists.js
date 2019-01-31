exports.listsSchema = `
type CDP_List {
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

type CDP_UpdateListEvent implements CDP_EventInterface {
  id: ID!
  _source : CDP_Source
  _client : CDP_Client
  _profileID: CDP_ProfileID!
  _profile : CDP_Profile!
  _object: CDP_Object!
  _location: GeoPoint
  _timestamp: DateTime
  joinLists : [CDP_List]
  leaveLists : [CDP_List]
}

"CDP standard eventType used to update profile list memberships"
input CDP_UpdateListEventInput {
  joinLists : [CDP_ListInput]
  leaveLists : [CDP_ListInput]
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
