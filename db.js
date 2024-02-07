// db.js

import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://team:jpr%40FEB19@cluster0.v2chkbt.mongodb.net/?retryWrites=true&w=majority'; 
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('storeLocator'); 
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}

module.exports = { connectDB };