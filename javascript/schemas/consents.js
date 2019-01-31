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
`;
