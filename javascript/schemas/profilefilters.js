exports.profileFiltersSchema = `
type CDP_ProfileFilter {
  properties : CDP_ProfilePropertiesFilter
  segments : [String]
  consents : [String]
  events : CDP_ProfileEventsFilter
}

input CDP_ProfileFilterInput {
  properties : CDP_ProfilePropertiesFilterInput
  segments : [String]
  consents : [String]
  events : CDP_ProfileEventsFilterInput
}

"""
Query profiles based on properties with this filter
"""
type CDP_ProfilePropertiesFilter {
  and : [CDP_ProfilePropertiesFilter]
  or : [CDP_ProfilePropertiesFilter]
  # generated profile properties filters will be listed below
}

input CDP_ProfilePropertiesFilterInput {
  and : [CDP_ProfilePropertiesFilterInput]
  or : CDP_ProfilePropertiesFilterInput
  # generated profile properties filters will be listed below
}

type CDP_ProfileEventsFilter {
  and : [CDP_ProfileEventsFilter]
  or : [CDP_ProfileEventsFilter]
  not : CDP_ProfileEventsFilter
  minimalCount : Int,
  maximalCount : Int,
  eventFilter : CDP_EventFilter
}

input CDP_ProfileEventsFilterInput {
  and : [CDP_ProfileEventsFilterInput]
  or : [CDP_ProfileEventsFilterInput]
  not : CDP_ProfileEventsFilterInput
  minimalCount : Int,
  maximalCount : Int,
  eventFilter : CDP_EventFilterInput
}

"""
Named filters are used to evaluate filters against a profile - useful for building personalized experiences.
"""
input CDP_NamedFilterInput {
  name : String!
  filter: CDP_ProfileFilterInput
}

# A result for a named filter match request.
type CDP_FilterMatch {
  name : String
  matched : Boolean
  executionTimeMillis : Int
}

`;
