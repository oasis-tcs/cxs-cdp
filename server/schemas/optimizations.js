exports.optimizationsSchema = `
type CDP_OptimizationResult {
    name : String!
    scoredObjects : [CDP_ScoredObject]
}

type CDP_ScoredObject {
    object : CDP_Object
    score : Float
}

input CDP_OptimizationInput {
    name : String!
    objects : [ID],
    eventOccurenceBoosts : [CDP_EventOccurenceBoostInput]
    strategy : String
    size : Int
}

input CDP_EventOccurenceBoostInput {
    eventType : String
    boost : Int
    fromDate : DateTime
    toDate : DateTime
}

input CDP_AlgorithmInput {
    name : String!
    parameters : JSON
}

type CDP_RecommendationResult {
    name : String!
    scoredObjects : [CDP_ScoredObject]
}

input CDP_RecommendationInput {
    name : String!
    objectUri : ID
    topics : [ID]
    size : Int
    algorithm : CDP_AlgorithmInput
}
`;
