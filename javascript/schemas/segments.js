exports.segmentsSchema = `
type CDP_Segment {
  id : ID!
  view: CDP_View!
  name : String!
  profiles : CDP_ProfileFilter
}

input CDP_SegmentInput {
  id : ID #optional, may be server-generated
  view : CDP_ViewInput!
  name : String
  profiles : CDP_ProfileFilterInput
}
`;
