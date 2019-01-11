
exports.cdpGlobalSchema = `
# CUSTOM SCALAR TYPES
# ----------------------------------------------------------------------------
"For values and arguments that cannot be defined structurally"
scalar JSON
"Uses RFC-3339 representation, for example 1996-12-19, see https://github.com/graphql-java/graphql-java-extended-scalars for example implementation "
scalar Date
"Uses RFC-3339 representation, for example 16:39:57-08:00, see https://github.com/graphql-java/graphql-java-extended-scalars for example implementation "
scalar Time
"Uses RFC-3339 representation, for example 1996-12-19T16:39:57-08:00, see https://github.com/graphql-java/graphql-java-extended-scalars for example implementation "
scalar DateTime
"Uses a string representation of lat,lon"
scalar GeoPoint
"This scalar is simply used to mark types as empty, since GraphQL doesn't allow that by default. Please ignore any fields using this scalar as they are not intended to be exposed"
scalar EmptyTypeWorkAround

type Query {
  cdp : CDP_Query
}

type Mutation {
  cdp : CDP_Mutation
}

type Subscription {
  cdp : CDP_Subscription
}

# Namespaced queries
type CDP_Query {
  "Please disregard the underscore field, it is only there because GraphQL schema doesn't allow empty types"
  _ : EmptyTypeWorkAround
}

type CDP_Mutation {
  deleteAllPersonalData : Boolean
}

type CDP_Subscription {
  eventListener(profileID : CDP_ProfileIDInput, filter: CDP_EventFilterInput) : CDP_Event!
  profileListener(profileID: CDP_ProfileIDInput) : CDP_Profile
  # jobListener(jobID: String) : JobStatus
}


# Roles are predefined in the CXS server implementation, no API is provided to manipulate them: system-admin, system-public, system-authenticated, acme-admin, test-admin
type CDP_Role {
  id : ID!
  name : String!
  displayName : String
  view : CDP_View!
}


`;
