const Post = require('../../models/Post');

module.exports = {
  Query: {
    getAllPosts: async (filter) => {
      try {
        return await Post.find(Object.values(filter)[0] === 'all' ? {} : filter)
      } catch (error) {
        throw error;
      }
    },

    findPostbyId: async (id) => {
      try {
        return await Post.findById(id);
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createPost: async (data) => {
      const { title, author, status, votes, community, body } = data;

      const newPost = new Post({
        title,
        author,
        status,
        votes,
        community,
        body
      })

      const post = await newPost.save();
      return post;
    },

    vote: async (data) => {
      const { id, isUpvote, userId } = data;
      const post = await Post.findById({ _id: id });
      const votes = Number(post.votes);
      const newVote = isUpvote ? votes + 1 : votes - 1;
      post.votes = newVote;
      post.voters.push(userId)
      return post.save();
    },

    setPupular: async () => {

      var count = 10;
      var lastAcceptable = await Post
        .find()
        .sort({ votes: "desc" })
        .limit(count);
        var lastElement = lastAcceptable.pop();      
      try {
        return Post.updateMany(
          {
            currentStatus: { $nin: ["popular"] },
            votes: { $gte: lastElement.votes }
          },
          { $set: { category: "popular" } }
        );
      } catch (e) {
        console.log(e);
      }
    },

    editPost: async (data) => {
      const {id, text, by} = data;
      const post = await Post.findById({_id: id})
      post.comments.push({text, by});
      return post.save();
    }
  }
}