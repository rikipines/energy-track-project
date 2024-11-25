
// src/lib/db.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);
export async function connectToDatabase() {
  await client.connect();
  const db = client.db('energy-consumption-track');
const devicesCollection = db.collection('devices'); 
return { db, devicesCollection, client };
}

