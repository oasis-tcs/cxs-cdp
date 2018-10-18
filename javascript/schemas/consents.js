exports.consentsSchema = `
enum CDP_ConsentStatus {
    GRANTED,
    DENIED,
    REVOKED
}

type CDP_Consent {
  token : ID! # similar to OAuth 2 authorization tokens to access the consent without the profile, also useful to delete the consent
  source : CDP_Source
  client : CDP_Client
  type : String! # "//mycompany.com/consents/newsletters/weekly", "//crmcompany.com/consents/push-to-crm", "//oasis_open.org/cxs/consents/send-to-third-parties"
  status : CDP_ConsentStatus!
  statusDate : String
  revokeDate : String
  profile : CDP_ProfileInterface
  events : CDP_EventConnection
}

input CDP_ConsentInput {
  sourceId : String
  clientId : String
  type : String! # "//mycompany.com/consents/newsletters/weekly", "//crmcompany.com/consents/push-to-crm", "//oasis_open.org/cxs/consents/send-to-third-parties"
  status : String,
  statusDate : String,
  revokeDate : String
}
`;
