exports.sourcesSchema = `
type CDP_Source {
    id : ID!
    thirdParty : Boolean
}

input CDP_SourceInput {
    id : ID! # the "system" source ID is reserved for the CXS context server to use for internal IDs.
    thirdParty : Boolean # optional, indicates that the source is a third party (useful for privacy regulations such as GDPR)
}

extend type CDP_Query {
  getSources : [CDP_Source]
}

extend type CDP_Mutation {
  createOrUpdateSource(source : CDP_SourceInput) : CDP_Source
  deleteSource(sourceID : ID!) : Boolean
}
`;
