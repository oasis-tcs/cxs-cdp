exports.consentsSchema = `
enum CDP_ConsentStatus {
    GRANTED,
    DENIED,
    REVOKED
}

"""
Token: Similar to OAuth 2 authorization tokens to access the consent without the profile, also useful to delete the consent
Type: Should be a Url or other meaningful identifier "//mycompany.com/consents/newsletters/weekly", "//crmcompany.com/consents/push-to-crm", "//oasis_open.org/cxs/consents/send-to-third-parties"
"""

type CDP_Consent {
  token : ID!
  source : CDP_Source
  client : CDP_Client
  type : String!
  status : CDP_ConsentStatus!
  statusDate : String
  revokeDate : String
  profile : CDP_ProfileInterface
  events : CDP_EventConnection
}

input CDP_ConsentInput {
  type : String!
  status : String,
  statusDate : String,
  revokeDate : String
}

"Standard EventType used to create or update a concent"
input CDP_UpdateConsentEventInput {
  consent : CDP_ConsentInput
}
`;
