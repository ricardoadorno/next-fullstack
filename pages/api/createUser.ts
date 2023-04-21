import connectMongo from "@/utils/lib/connectDB";
import Users from "@/utils/models/users";
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
