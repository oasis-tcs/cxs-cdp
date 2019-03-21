exports.eventsSchema = `
interface CDP_EventInterface {
  id: ID!
  cdp_source : CDP_Source
  cdp_client : CDP_Client
  cdp_profileID: CDP_ProfileID!
  cdp_profile : CDP_Profile!
  cdp_object: CDP_Object!
  cdp_location: GeoPoint
  cdp_timestamp: DateTime
  cdp_topics : [CDP_Topic]
}


"""
Event wrapper object to handle missing input inheritance in GraphQL
NB! For optimization reasons, a single EventInput may contain multiple events,
but only one of each type. ID is optional, with the exception of importing
"""
input CDP_EventInput {
  id: ID
  cdp_sourceID : String
  cdp_profileID: CDP_ProfileIDInput!
  cdp_objectID: ID!
  cdp_location: GeoPoint
  cdp_timestamp: DateTime
  cdp_topics : [ID]
  cdp_profileUpdateEvent : CDP_ProfileUpdateEventInput
  cdp_consentUpdateEvent : CDP_ConsentUpdateEventInput
  cdp_listsUpdateEvent : CDP_ListsUpdateEventInput
  cdp_sessionEvent : CDP_SessionEventInput
  # Sample custom EventTypes below:
  # my_pageView : MY_PageViewEventInput
  # my_addedToCart : MY_addedToCartEventInput,
  # other_crmUpdate : OTHER_crmUpdateEventInput
}

extend type CDP_Query {
  getEvent(id : String!) : CDP_EventInterface
  findEvents(filter : CDP_EventFilterInput, orderBy : [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_EventConnection
}

extend type CDP_Mutation {
  processEvents(events: [CDP_EventInput]!) : Int
}

extend type CDP_Subscription {
  eventListener(filter: CDP_EventFilterInput) : CDP_EventInterface!
}

`;
