import mongoose from "mongoose";

const url = process.env.MONGODB_URI as string;
const options = {};

let mongoClient: any = null;

export default async function connectMongo() {
  try {
    if (mongoClient) return mongoClient;

    mongoClient = await mongoose.connect(url, options);
    console.log("Connected to MongoDB");
    return { mongoClient };
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}
