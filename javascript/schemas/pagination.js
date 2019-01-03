exports.paginationSchema = `
# PAGINATION-RELATED TYPES
# ----------------------------------------------------------------------------

type PageInfo {
  hasPreviousPage : Boolean!
  hasNextPage : Boolean!
}

type CDP_EventEdge {
  node : CDP_Event
  cursor : String!
}

type CDP_EventConnection {
  edges : [CDP_EventEdge]
  pageInfo : PageInfo
}

type CDP_PropertyEdge {
  node : CDP_Property
  cursor : String!
}

type CDP_PropertyConnection {
  edges : [CDP_PropertyEdge]
  pageInfo : PageInfo
}

type CDP_ProfileEdge {
  node : CDP_ProfileInterface
  cursor : String!
}

type CDP_ProfileConnection {
  totalCount: Int
  edges : [CDP_ProfileEdge]
  pageInfo : PageInfo
}

type CDP_SegmentEdge {
  node: CDP_Segment
  cursor: String!
}

type CDP_SegmentConnection {
  totalCount: Int
  edges : [CDP_SegmentEdge]
  pageInfo : PageInfo
}

type CDP_ListEdge {
  node: CDP_List
  cursor: String!
}

type CDP_ListConnection {
  totalCount: Int
  edges : [CDP_ListEdge]
  pageInfo : PageInfo
}

type CDP_TopicEdge {
  node: CDP_Topic
  cursor: String!
}

type CDP_TopicConnection {
  totalCount: Int
  edges : [CDP_TopicEdge]
  pageInfo : PageInfo
}

type CDP_InterestEdge {
  node : CDP_Interest
  cursor: String!
}

type CDP_InterestConnection {
  totalCount: Int
  edges : [CDP_InterestEdge]
  pageInfo : PageInfo
}

`;
