exports.viewsSchema = `

type CDP_View {
  name: ID!
}

input CDP_ViewInput {
  name: ID!
}

extend type CDP_Query {
  getViews : [CDP_View]
}

extend type CDP_Mutation {
  createOrUpdateView(view: CDP_ViewInput) : CDP_View
  deleteView(viewID : ID!) : Boolean
}
`;
