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
  propertyTypes : [CDP_PropertyType]
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
`;
