exports.querySchema = `
"Context Server GraphQL queries"
type CDP_Query {

  getEventTypes : [CDP_EventType]
  getEvent(id : String!) : CDP_Event
  findEvents(filter : CDP_EventFilterInput, orderBy : [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_EventConnection

  getProfile(profileID : CDP_ProfileIDInput, createIfMissing: Boolean) : CDP_Profile
  findProfiles(filter: CDP_ProfileFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection

  getPersona(personaID : String) : CDP_Persona
  findPersonas(filter: CDP_ProfileFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection

  getSegment(segmentID : ID) : CDP_Segment
  findSegments(filter: CDP_SegmentFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_SegmentConnection

  getList(listID : ID) : CDP_List
  findLists(filter: CDP_ListFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_ListConnection

  getTopic(topicID : ID) : CDP_Topic
  findTopics(filter: CDP_TopicFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_TopicConnection

  getProfilePropertyTypes : CDP_PropertyTypeConnection

  getViews : [CDP_View]

  getSources : [CDP_Source]
}
`;
