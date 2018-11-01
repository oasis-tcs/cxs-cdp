exports.profileFiltersSchema = `
type CDP_ProfileFilter {
  asString : String # optional ?
  properties : CDP_ProfilePropertiesFilter
  segments : [String]
  consents : [String]
  events : CDP_ProfileEventsFilter
}

#Example for asString value : profile.test = 'testValue' AND eventOccurrence('pageView') = 10
input CDP_ProfileFilterInput {
  asString : String # optional ?
  properties : CDP_ProfilePropertiesFilterInput
  segments : [String]
  consents : [String]
  events : CDP_ProfileEventsFilterInput
}

input CDP_ProfileEventsFilterInput {
  and : [CDP_ProfileEventsFilterInput]
  or : [CDP_ProfileEventsFilterInput]
  not : CDP_ProfileEventsFilterInput
  minimalCount : Int,
  maximalCount : Int,
  eventFilter : CDP_EventFilterInput
}

# This filter will contain generated fields that are concatenations of property names and operators.
type CDP_ProfilePropertiesFilter {
  and : [CDP_ProfilePropertiesFilter]
  or : [CDP_ProfilePropertiesFilter]
  # generated profile properties filters will be listed below
}

# This filter will contain generated fields that are concatenations of property names and operators.
input CDP_ProfilePropertiesFilterInput {
  and : [CDP_ProfilePropertiesFilterInput]
  or : CDP_ProfilePropertiesFilterInput
  # generated profile properties filters will be listed below
}
`;
