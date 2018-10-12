exports.segmentFilterInputSchema = `
input CDP_SegmentFilterInput {
  and : [CDP_SegmentFilterInput]
  or : [CDP_SegmentFilterInput]

  view_equals : String
  view_regexp : String
  name_equals : String
  name_regexp : String
}
`;
