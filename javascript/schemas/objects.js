exports.objectsSchema = `
type CDP_Object {
    id : ID!
    collections : [String]!
}

input CDP_ObjectInput {
    id : ID!
    collections : [String]!
}
`;
