exports.personasSchema = `
"""
Emulate real profiles with personas
"""
type CDP_Persona implements CDP_ProfileInterface {
  id : ID!
  _name : String!
  _view : CDP_View!
  _profileIDs : [CDP_ProfileID]
  _segments(views : [CDP_ViewInput]) : [CDP_Segment]
  _interests(views : [CDP_ViewInput]) : [CDP_Interest]
  _consents : [CDP_Consent]
  _lists(views : [CDP_ViewInput]) : [CDP_List]
  # fields will be added here according to registered profile properties  
}

input CDP_PersonaInput {
  id : ID
  _name : String!
  _view : CDP_ViewInput!
  _profileIDs : [CDP_ProfileIDInput]
  _segments : [String]
  _interests : [CDP_InterestInput]
  _consents : [CDP_PersonaConsentInput]
  # fields will be added here according to registered profile properties  
}

# Used to update personas
input CDP_PersonaConsentInput {
  type : String!
  status : String,
  statusDate : String,
  revokeDate : String
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
