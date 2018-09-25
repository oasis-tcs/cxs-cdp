exports.querySchema = `
"Context Server GraphQL queries"
type CXS_Query {

  getEventTypes : [CXS_EventType]
  getEvent(id : String!) : CXS_Event
  findEvents(filter : CXS_EventFilterInput, orderBy : [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_EventConnection

  getProfile(profileID : CXS_ProfileIDInput, createIfMissing: Boolean) : CXS_Profile
  findProfiles(filter: CXS_ProfileFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_ProfileConnection

  getPersona(personaID : String) : CXS_Persona
  findPersonas(filter: CXS_ProfileFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_ProfileConnection

  getSegment(segmentID : ID) : CXS_Segment
  findSegments(filter: CXS_SegmentFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_SegmentConnection

  getList(listID : ID) : CXS_List
  findLists(filter: CXS_ListFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_ListConnection

  getTopic(topicID : ID) : CXS_Topic
  findTopics(filter: CXS_TopicFilterInput, orderBy: [CXS_OrderByInput], first: Int, after: String, last: Int, before: String) : CXS_TopicConnection

  getProfilePropertyTypes : CXS_PropertyTypeConnection

  getViews : [CXS_View]

  getSources : [CXS_Source]
}
`;
