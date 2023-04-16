import connectMongo from "@/lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/models/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const users = await Users.find();

    res.json({ users });
  } catch (error) {}
}
