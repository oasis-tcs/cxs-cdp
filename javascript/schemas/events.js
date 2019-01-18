exports.eventsSchema = `
interface CDP_Event {
  id: ID!
  _source : CDP_Source
  _client : CDP_Client
  _profileID: CDP_ProfileID!
  _profile : CDP_Profile!
  _object: CDP_Object!
  _location: GeoPoint
  _timestamp: DateTime
}

"""
Event wrapper object to handle missing input inheritance in GraphQL
NB! For optimization reasons, a single EventInput may contain multiple events,
but only one of each type. ID is optional, with the exception of importing
"""
input CDP_EventInput {
  id: ID
  _clientID : String
  _sourceID : String
  _profileID: CDP_ProfileIDInput!
  _object: CDP_ObjectInput!
  _location: GeoPoint
  _timestamp: DateTime
  _profileUpdateEvent : CDP_ProfileUpdateEventInput
  _updateConsentEvent : CDP_UpdateConsentEventInput
  _updateListsEvent : CDP_UpdateListEventInput
  _sessionStateEvent : CDP_SessionStateEventInput
  # Sample custom EventTypes below:
  # my_pageView : MY_PageViewEventInput
  # my_addedToCart : MY_addedToCartEventInput,
  # other_crmUpdate : OTHER_crmUpdateEventInput
}

extend type CDP_Query {
  getEvent(id : String!) : CDP_Event
  findEvents(filter : CDP_EventFilterInput, orderBy : [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_EventConnection
}

extend type CDP_Mutation {
  processEvents(events: [CDP_EventInput]!) : Int
}

extend type CDP_Subscription {
  eventListener(filter: CDP_EventFilterInput) : CDP_Event!
}

`;
