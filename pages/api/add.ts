import connectMongo from "@/lib/connectDB";
import Users from "@/models/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    console.log("CREATING DOCUMENT");
    const newUser = await Users.create(req.body);
    console.log("CREATED DOCUMENT");

    res.json({ newUser });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
