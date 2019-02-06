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

type CDP_UpdateConsentEvent implements CDP_EventInterface {
  id: ID!
  _source : CDP_Source
  _client : CDP_Client
  _profileID: CDP_ProfileID!
  _profile : CDP_Profile!
  _object: CDP_Object!
  _location: GeoPoint
  _timestamp: DateTime
  _topics : [CDP_Topic]
  type : String!
  status : String,
  lastUpdate : DateTime,
  expiration : DateTime
}

"Standard EventType used to create or update a consent"
input CDP_UpdateConsentEventInput {
  type : String!
  status : String,
  lastUpdate : DateTime,
  expiration : DateTime
}

"Filter for consent update events"
type CDP_UpdateConsentEventFilter {
  type_equals : String,
  status_equals : String,
  lastUpdate_equals : DateTime,
  lastUpdate_lt : DateTime,
  lastUpdate_lte : DateTime,
  lastUpdate_gt : DateTime,
  lastUpdate_gte : DateTime,
  expiration_equals : DateTime 
}

input CDP_UpdateConsentEventFilterInput {
  type_equals : String,
  status_equals : String
  lastUpdate_between : CDP_DateFilterInput,
  expiration_between : CDP_DateFilterInput
}
`;
