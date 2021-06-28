const mongoose = require('mongoose');

const initDB = () => {

  mongoose.connect(
    'mongodb+srv://admin:yciLJ5RYzscQBLA6@cluster0.srtwt.mongodb.net/dozers',
    { useNewUrlParser: true }
  );

  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });

}

module.exports = initDB;