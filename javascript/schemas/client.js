exports.clientsSchema = `
type CDP_Client {
    id : ID!
    title : String
    sources : [CDP_Source] # optional
}

input CDP_ClientInput {
    id : ID!
    title : String
}
`;
