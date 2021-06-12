const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

module.exports = {
    // 0. NODE ENV
    NODE_ENV: process.env.NODE_ENV,

    // 1. MongoDB
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://adsoft:adsoft@cluster0.bgmmp.mongodb.net/Coffee?retryWrites=true&w=majority',
  
    // 2. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',
  
    // 3. Express Server Port
    LISTEN_PORT: process.env.LISTEN_PORT || 8081,

    // 4. Host Domain
    HOST_URL: process.env.HOST_URL || 'localhost'
  };