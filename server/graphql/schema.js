const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');
const gql = require('gql-tag');
const PostType = require('./types/Post');
const PostModel = require('../models/Post');

const schema = buildSchema(`
    type User {
        id: ID!
        username: String!
        password: String!
    }

    type Query {
        user(id: String): User
        users: User!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
    }

    type Mutation {
        register(registerInput: RegisterInput) : User
        login(username: String!, password: String!): User!
    }
`);

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "Query",
//     fields: {
//       posts: {
//         type: GraphQLList(PostType),
//         resolve: (root, args, context, info) => {
//           return PostModel.find().exec();
//         }
//       }
//     }
//   }),

//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//       post: {
//         type: PostType,
//         args: {
//           title: { type: GraphQLNonNull(GraphQLString)},
//           author: { type: GraphQLNonNull(GraphQLString)},
//           body: { type: GraphQLNonNull(GraphQLString)},
//           status: { type: GraphQLNonNull(GraphQLString)},
//           votes: { type: GraphQLNonNull(GraphQLString)}
//         },
//         resolve: (root, args, context, info) => {
//           const post = new PostModel(args);
//           return post.save();
//         }
//       },
//       vote: {
//         type: PostType,
//         args: {
//           id: { type: GraphQLID },
//           votes: { type: GraphQLString }
//         },
//         resolve: () => {
//           const post = find(post, { id });
//           if (!post) {
//             throw new Error(`Couldn’t find author with id ${id}`);
//           }

//           post.votes = votes;
//           return post.save();
//         }
//       }
//     }
//   })
// })

module.exports = schema;