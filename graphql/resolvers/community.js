const Community = require('../../models/Community');

module.exports = {
    Query: {
        getAllCommunities: async () => {
            try {
              return await Community.find();
            } catch (error) {
              throw error;
            }
          },

        findCommunitybyId: async (id) => {
            try {
              return await Community.findById(id)
            } catch (error) {
              throw error;
            }
          },
    },

    Mutation: {
        createCommunity: async (data) => {
            const { name, description } = data;

            const newCommunity = new Community({
                name,
                description
            })

            const post =  await newCommunity.save();
            return post;
        }
    }
  }