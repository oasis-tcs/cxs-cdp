exports.listsSchema = `
type CDP_List {
  id : ID!
  view: CDP_View!
  name : String!
  active(first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection
  inactive(first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection
}

"The id optional only when creating a list and can be server generated. For all other operations it is required"
input CDP_ListInput {
  id : ID 
  view: ID!
  name : String!
}

type CDP_ListsUpdateEvent implements CDP_EventInterface {
  id: ID!
  _source : CDP_Source
  _client : CDP_Client
  _profileID: CDP_ProfileID!
  _profile : CDP_Profile!
  _object: CDP_Object!
  _location: GeoPoint
  _timestamp: DateTime
  _topics : [CDP_Topic]  
  joinLists : [CDP_List]
  leaveLists : [CDP_List]
}

"CDP standard eventType used to update profile list memberships"
input CDP_ListsUpdateEventInput {
  joinLists : [ID]
  leaveLists : [ID]
}

type CDP_ListsUpdateEventFilter {
  joinLists_contains : [ID]
  leaveLists_contains : [ID]
}

input CDP_ListsUpdateEventFilterInput {
  joinLists_contains : [ID]
  leaveLists_contains : [ID]
}

extend type CDP_Query {
  getList(listID : ID) : CDP_List
  findLists(filter: CDP_ListFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_ListConnection
}

extend type CDP_Mutation {
  createOrUpdateList(list : CDP_ListInput) : CDP_List
  addProfileToList(listID : ID, profileID : CDP_ProfileIDInput, active : Boolean) : CDP_List
  removeProfileFromList(listID : ID, profileID : CDP_ProfileIDInput) : CDP_List
  deleteList(listID : ID) : CDP_List
}
`;
