exports.consentsSchema = `
enum CDP_ConsentStatus {
    GRANTED,
    DENIED,
    REVOKED
}

type CDP_Consent {
  token : ID!
  source : CDP_Source
  client : CDP_Client
  type : String!
  status : CDP_ConsentStatus!
  lastUpdate : DateTime
  expiration : DateTime
  profile : CDP_ProfileInterface
  events : CDP_EventConnection
}

type CDP_ConsentUpdateEvent implements CDP_EventInterface {
  id: ID!
  cdp_source : CDP_Source
  cdp_client : CDP_Client
  cdp_profileID: CDP_ProfileID!
  cdp_profile : CDP_Profile!
  cdp_object: CDP_Object!
  cdp_location: GeoPoint
  cdp_timestamp: DateTime
  cdp_topics : [CDP_Topic]
  type : String!
  status : String,
  lastUpdate : DateTime,
  expiration : DateTime
}

"Standard EventType used to create or update a consent"
input CDP_ConsentUpdateEventInput {
  type : String!
  status : String,
  lastUpdate : DateTime,
  expiration : DateTime
}

"Filter for consent update events"
type CDP_ConsentUpdateEventFilter {
  type_equals : String,
  status_equals : String,
  lastUpdate_equals : DateTime,
  lastUpdate_lt : DateTime,
  lastUpdate_lte : DateTime,
  lastUpdate_gt : DateTime,
  lastUpdate_gte : DateTime,
  expiration_equals : DateTime,
  expiration_lt : DateTime,
  expiration_lte : DateTime,
  expiration_gt : DateTime,
  expiration_gte : DateTime 
}

input CDP_ConsentUpdateEventFilterInput {
  type_equals : String,
  status_equals : String
  lastUpdate_equals : DateTime,
  lastUpdate_lt : DateTime,
  lastUpdate_lte : DateTime,
  lastUpdate_gt : DateTime,
  lastUpdate_gte : DateTime,
  expiration_equals : DateTime,
  expiration_lt : DateTime,
  expiration_lte : DateTime,
  expiration_gt : DateTime,
  expiration_gte : DateTime 
}
`;
