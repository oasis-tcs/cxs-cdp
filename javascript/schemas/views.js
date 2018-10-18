exports.viewsSchema = `
# Management objects are associated with a view
type CDP_View {
  name: ID!
}

input CDP_ViewInput {
  name: ID!
}
`;
