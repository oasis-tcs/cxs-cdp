
exports.cdpGlobalSchema = `
# CUSTOM SCALAR TYPES
# ----------------------------------------------------------------------------

"We use a custom JSON scalar type for arguments that cannot be defined in this specification"
scalar JSON
"We use a custom scalar type to be able to define empty types since GraphQL doesn't allow that by default"
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
