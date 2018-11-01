exports.subscriptionSchema = `
"Context Server GraphQL subscriptions"
type CDP_Subscription {
  eventListener(profileID : CDP_ProfileIDInput, filter: CDP_EventFilterInput) : CDP_Event!

  profileListener(profileID: CDP_ProfileIDInput) : CDP_Profile

  # jobListener(jobID: String) : JobStatus
}
`;
