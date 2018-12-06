exports.segmentsSchema = `
type CDP_Segment {
  id : ID!
  view: CDP_View!
  name : String!
  profiles : CDP_ProfileFilter
}

input CDP_SegmentInput {
  id : ID
  view : CDP_ViewInput!
  name : String
  profiles : CDP_ProfileFilterInput
}

extend type CDP_Query {
  getSegment(segmentID : ID) : CDP_Segment
  findSegments(filter: CDP_SegmentFilterInput, orderBy: [CDP_OrderByInput], first: Int, after: String, last: Int, before: String) : CDP_SegmentConnection
}

extend type CDP_Mutation {
  createOrUpdateSegment(segment : CDP_SegmentInput) : CDP_Segment
  deleteSegment(segmentID : String) : CDP_Segment
}



`;
