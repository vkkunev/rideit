const postResolvers =  require('./posts');
const userResolvers = require('./users');
const communityResolvers = require('./community');

module.exports = {
  Query: {
    ...postResolvers.Query,
    ...communityResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...communityResolvers.Mutation
  }
}