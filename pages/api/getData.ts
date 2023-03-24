import { connectMongo } from "@/lib/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { mongoClient } = await connectMongo();
    const db = mongoClient.db("notes_app");
    const collection = db.collection("notes");
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
  } catch (error) {}
}
