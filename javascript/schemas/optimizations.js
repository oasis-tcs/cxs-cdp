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
    objects : [CDP_ObjectInput],
    eventOccurenceBoosts : [CDP_EventOccurenceBoostInput]
    strategy : String
}

input CDP_EventOccurenceBoostInput {
    eventType : String
    boost : Int
    fromDate : String
    toDate : String
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
    objectID : ID
    collections : [String]
    size : Int
    algorithm : CDP_AlgorithmInput
}
`;
