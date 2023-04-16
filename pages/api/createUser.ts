import connectMongo from "@/lib/connectDB";
import Users from "@/models/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const newUser = await Users.create(req.body);

    res.json({ newUser });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
