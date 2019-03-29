exports.personasSchema = `
"""
Emulate real profiles with personas
"""
type CDP_Persona implements CDP_ProfileInterface {
  id : ID!
  cdp_name : String!
  cdp_view : CDP_View!
  cdp_profileIDs : [CDP_ProfileID]
  cdp_segments(views : [ID]) : [CDP_Segment]
  cdp_interests(views : [ID]) : [CDP_Interest]
  cdp_consents : [CDP_Consent]
  cdp_lists(views : [ID]) : [CDP_List]
  # fields will be added here according to registered profile properties
}


input CDP_PersonaInput {
  id : ID
  cdp_name : String!
  cdp_view : ID!
  cdp_profileIDs : [CDP_ProfileIDInput]
  cdp_segments : [ID]
  cdp_interests : [CDP_InterestInput]
  cdp_consents : [CDP_PersonaConsentInput]
  # fields will be added here according to registered profile properties
}

# Used to update personas
input CDP_PersonaConsentInput {
  type : String!
  status : String,
  lastUpdate : DateTime,
  expiration : DateTime
}

extend type CDP_Query {
  getPersona(personaID : String) : CDP_Persona
  findPersonas(filter: CDP_ProfileFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_ProfileConnection
}

extend type CDP_Mutation {
  createOrUpdatePersona(persona : CDP_PersonaInput) : CDP_Persona
  deletePersona(personaID : String) : CDP_Persona
}
`;
