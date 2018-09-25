exports.clientsSchema = `
type CXS_Client {
    id : ID!
    title : String
    sources : [CXS_Source] # optional
}

input CXS_ClientInput {
    id : ID!
    title : String
}
`;
