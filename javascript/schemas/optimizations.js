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
    strategy : String # unspecified, random, scoring, best first match, worst match, a/b test ?
}

input CDP_EventOccurenceBoostInput {
    eventType : String
    boost : Int # could be negative
    fromDate : String
    toDate : String
}

input CDP_AlgorithmInput {
    name : String! # similarity, bought-Together, bought-byOthers, viewed-byOthers, trending, related
    parameters : JSON # parameters can be used to filter the results of the recommendation algorithm or any other custom processing that is supported by the implementation. Parameters are specific to the algorithm.
}

type CDP_RecommendationResult {
    name : String!
    scoredObjects : [CDP_ScoredObject]
}

input CDP_RecommendationInput {
    name : String!
    objectID : ID # this is optional since we might just want to use collections to retrieve recommendations
    collections : [String] # collections we want to use to retrieve recommendations
    size : Int # maximum number of results to retrieve
    algorithm : CDP_AlgorithmInput
}
`;
