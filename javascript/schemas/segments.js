exports.segmentsSchema = `
type CXS_Segment {
  id : ID!
  view: CXS_View!
  name : String!
  profiles : CXS_ProfileFilter
}

input CXS_SegmentInput {
  id : ID #optional, may be server-generated
  view : CXS_ViewInput!
  name : String
  profiles : CXS_ProfileFilterInput
}
`;
