exports.managementFiltersSchema = `
input CDP_SegmentFilterInput {
  and : [CDP_SegmentFilterInput]
  or : [CDP_SegmentFilterInput]
  view_equals : String
  view_regexp : String
  name_equals : String
  name_regexp : String
}

input CDP_ListFilterInput {
  and : [CDP_ListFilterInput]
  or : [CDP_ListFilterInput]
  view_equals : String
  name_equals : String
  name_regexp : String
}

input CDP_TopicFilterInput {
  and : [CDP_TopicFilterInput]
  or : [CDP_TopicFilterInput]
  view_equals : String
  id_equals : String
  displayName_regexp : String
}
`;
