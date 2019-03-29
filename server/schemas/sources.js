exports.sourcesSchema = `
type CDP_Source {
    id : ID!
    thirdParty : Boolean
}

input CDP_SourceInput {
    id : ID!
    thirdParty : Boolean
}

extend type CDP_Query {
  getSources : [CDP_Source]
}

extend type CDP_Mutation {
  createOrUpdateSource(source : CDP_SourceInput) : CDP_Source
  deleteSource(sourceID : ID!) : Boolean
}
`;
