import connectMongo from "@/utils/lib/connectDB";
import Users from "@/utils/models/users";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/utils/lib/hashPassword";

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();

    const { username, password } = req.body;

    const hashedPass = hashPassword(password);

    const newUser = await Users.create({
      username,
      password: hashedPass,
    });

    res.json({ newUser });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
