exports.sourcesSchema = `
type CDP_Source {
    id : ID! # the "system" source ID is reserved for the CXS context server to use for internal IDs.
    thirdParty : Boolean # optional, indicates that the source is a third party (useful for privacy regulations such as GDPR)
}

input CDP_SourceInput {
    id : ID! # the "system" source ID is reserved for the CXS context server to use for internal IDs.
    thirdParty : Boolean # optional, indicates that the source is a third party (useful for privacy regulations such as GDPR)
}

`;
