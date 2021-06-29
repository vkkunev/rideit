const gql = require('graphql-tag');

const PostType = gql`
  type Post {
    id: ID!
    title: String!
    author: String!
    status: String!
    votes: String!
    body: String!
  },
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  },
  type Mutation {
    createPost(title: String!, author: String!, status: String!, votes: String!): Post!
  }
`;

module.exports = PostType;