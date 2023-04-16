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

    if (!users) {
      return res.status(400).json({ msg: "No users found" });
    } else {
      return res.status(200).json({ success: true, data: users });
    }
  } catch (error) {}
}
