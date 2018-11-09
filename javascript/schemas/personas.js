exports.personasSchema = `
type CDP_Persona implements CDP_ProfileInterface {
  id : ID!
  name : String!
  view : CDP_View!
  profileIDs : [CDP_ProfileID] # the CXS server may generated a system profile ID and expose it here
  segments(views : [CDP_ViewInput]) : [CDP_Segment]
  interests(views : [CDP_ViewInput]) : [CDP_Interest]
  consents : [CDP_Consent]
  lists(views : [CDP_ViewInput]) : [CDP_List]
  properties : CDP_ProfileProperties
  propertyTypes : [CDP_PropertyTypeInterface]
}

input CDP_PersonaInput {
  id : ID #optional, may be server-generated
  name : String!
  view : CDP_ViewInput!
  profileIDs : [CDP_ProfileIDInput] # the CXS server may generated a system profile ID and expose it here
  segments : [String]
  interests : [CDP_InterestInput]
  consents : [CDP_ConsentInput]
  properties : CDP_ProfilePropertiesInput
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
