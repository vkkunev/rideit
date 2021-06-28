const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const server = require('../../../app');
const should = chai.should();

const Post = require('../../../models/Post')


chai.use(chaiHttp);

describe('API Tests', function() {
  before(function() {
    mongoose.connect(
      process.env.DB_URL,
      {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }
  );
  });

  beforeEach(function(done) {
    const newPost = new Post({
      titel: "test post",
      author: "author",
      status: "test",
      votes: "23",
      community: "test",
      body: "this is test "
    })
    newPost.save();
    done();
  });

  afterEach(function(done) {
    Post.remove({});
    done()
  });

  after(function() {
    mongoose.connection.close();
  });

  describe('Posts', function() {

    it.only('It should list all posts from /posts POST', function (done) {
      const filter = {'category': 'all'};
      chai.request('http://localhost:3001')
        .post('/posts')
        .send(filter)
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('Array');
          done();
        });
    });

  });

});