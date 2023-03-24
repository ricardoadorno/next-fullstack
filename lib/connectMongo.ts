import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI as string;
const options = {};

let mongoClient: any = null;

export async function connectMongo() {
  try {
    if (mongoClient) return mongoClient;

    mongoClient = await new MongoClient(url, options).connect();
    console.log("Connected to MongoDB");
    return { mongoClient };
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}
