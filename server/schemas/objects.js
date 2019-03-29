exports.objectsSchema = `
type CDP_Object {
    uri : ID! # uri format : scheme:path, https://tools.ietf.org/html/rfc3986
    scheme : String
    path : String
    topics : [CDP_Topic]
}

input CDP_ObjectInput {
    uri : ID!
}
`;
