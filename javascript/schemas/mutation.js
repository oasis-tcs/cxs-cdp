exports.mutationSchema = `
"Customer Data Platform mutations"
type CDP_Mutation {
  # Events may trigger different types of operations within the context server, such as updating consents,
  # reset interests, or profile updates.
  processEvents(events: [CDP_EventInput]!) : Int

  deleteProfile(profileID : CDP_ProfileIDInput) : CDP_Profile

  createOrUpdatePersona(persona : CDP_PersonaInput) : CDP_Persona
  deletePersona(personaID : String) : CDP_Persona

  createOrUpdateSegment(segment : CDP_SegmentInput) : CDP_Segment
  deleteSegment(segmentID : String) : CDP_Segment

  createOrUpdateList(list : CDP_ListInput) : CDP_List
  addProfileToList(list : CDP_ListInput, profileID : CDP_ProfileIDInput, active : Boolean) : CDP_List
  removeProfileFromList(list : CDP_ListInput, profileID : CDP_ProfileIDInput) : CDP_List
  deleteList(listID : String) : CDP_List

  createOrUpdateTopic(topic : CDP_TopicInput) : CDP_Topic
  deleteTopic(topicID : String) : CDP_Topic

  addProfilePropertyTypes(propertyTypes : [CDP_PropertyTypeInput]) : Boolean
  deleteProfilePropertyType(propertyTypeName : ID!) : Boolean

  createOrUpdateEventType(eventType : CDP_EventTypeInput) : CDP_EventType
  deleteEventType(eventName : ID!) : Boolean

  createOrUpdateView(view: CDP_ViewInput) : CDP_View
  deleteView(viewID : ID!) : Boolean

  createOrUpdateSource(source : CDP_SourceInput) : CDP_Source
  deleteSource(sourceID : ID!) : Boolean

  # Privacy
  deleteAllPersonalData : Boolean
}
`;
