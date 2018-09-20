exports.segmentFilterInputSchema = `
input CXS_SegmentFilterInput {
  and : [CXS_SegmentFilterInput]
  or : [CXS_SegmentFilterInput]

  view_equals : String
  view_regexp : String
  name_equals : String
  name_regexp : String
}
`;
