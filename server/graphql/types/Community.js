const gql = require('graphql-tag');

const CommunityType = gql`
  type Community {
    id: ID!
    name: String!
    description: String!
  },
  type Query {
    getCommunities: [Community]
    getCommunity(communityID: ID!): Community
  },
  type Mutation {
    createCommunity(name: String!, description: String!): Community!
  }
`;

module.exports = CommunityType;