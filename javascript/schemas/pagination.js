exports.paginationSchema = `
# PAGINATION-RELATED TYPES
# ----------------------------------------------------------------------------

type PageInfo {
  hasPreviousPage : Boolean!
  hasNextPage : Boolean!
}

type CXS_EventEdge {
  node : CXS_Event
  cursor : String!
}

type CXS_EventConnection {
  edges : [CXS_EventEdge]
  pageInfo : PageInfo
}

type CXS_PropertyTypeEdge {
  node : CXS_PropertyType
  cursor : String!
}

type CXS_PropertyTypeConnection {
  edges : [CXS_PropertyTypeEdge]
  pageInfo : PageInfo
}

type CXS_ProfileEdge {
  node : CXS_ProfileInterface
  cursor : String!
}

type CXS_ProfileConnection {
  totalCount: Int
  edges : [CXS_ProfileEdge]
  pageInfo : PageInfo
}

type CXS_SegmentEdge {
  node: CXS_Segment
  cursor: String!
}

type CXS_SegmentConnection {
  totalCount: Int
  edges : [CXS_SegmentEdge]
  pageInfo : PageInfo
}

type CXS_ListEdge {
  node: CXS_List
  cursor: String!
}

type CXS_ListConnection {
  totalCount: Int
  edges : [CXS_ListEdge]
  pageInfo : PageInfo
}

type CXS_TopicEdge {
  node: CXS_Topic
  cursor: String!
}

type CXS_TopicConnection {
  totalCount: Int
  edges : [CXS_TopicEdge]
  pageInfo : PageInfo
}

type CXS_InterestEdge {
  node : CXS_Interest
  cursor: String!
}

type CXS_InterestConnection {
  totalCount: Int
  edges : [CXS_InterestEdge]
  pageInfo : PageInfo
}
`;
