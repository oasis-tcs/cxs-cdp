exports.optimizationsSchema = `
# Object is globally unique in its combination of id and collections
type CDP_Object {
    id : ID! # unique within each specified collection
    collections : [String]! # could be URIs, e.g. schema.org (http://schema.org/Product) or reverse domain naming convention (org.acme.Product)
}

input CDP_ObjectInput {
    id : ID! # unique within each specified collection
  collections : [String]! # a way of classifying objects : page, product, article
}

type CDP_OptimizationResult {
    name : String!
    scoredObjects : [CDP_ScoredObject]
}

type CDP_ScoredObject {
    object : CDP_Object
    score : Float
}

# Example : return list of products that the profile has viewed but not bought
input CDP_OptimizationInput {
    name : String!
    objects : [CDP_ObjectInput],
    eventOccurenceBoosts : [CDP_EventOccurenceBoostInput]
    strategy : String # unspecified, random, scoring, best first match, worst match, a/b test ?
}

# Used to boost positively/negatively the algorithm based on event type and time span: i.e. return a list of products the profile has viewed in the last year
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
