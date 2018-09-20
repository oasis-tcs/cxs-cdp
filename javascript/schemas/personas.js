exports.personasSchema = `
type CXS_Persona implements CXS_ProfileInterface {
  id : ID!
  name : String!
  view : CXS_View!
  profileIDs : [CXS_ProfileID] # the CXS server may generated a system profile ID and expose it here
  segments(views : [CXS_ViewInput]) : [CXS_Segment]
  interests(views : [CXS_ViewInput]) : [CXS_Interest]
  consents : [CXS_Consent]
  lists(views : [CXS_ViewInput]) : [CXS_List]
  properties : CXS_ProfileProperties
  propertyTypes : [CXS_PropertyType]
}

input CXS_PersonaInput {
  id : ID #optional, may be server-generated
  name : String!
  view : CXS_ViewInput!
  profileIDs : [CXS_ProfileIDInput] # the CXS server may generated a system profile ID and expose it here
  segments : [String]
  interests : [CXS_InterestInput]
  consents : [CXS_ConsentInput]
  properties : CXS_ProfilePropertiesInput
}
`;
