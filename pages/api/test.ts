import connectMongo from "@/lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/models/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    console.log("FETCHING DOCUMENTS");
    const users = await Users.find();
    console.log("FETCHED DOCUMENTS");

    res.json({ users });
  } catch (error) {}
}
