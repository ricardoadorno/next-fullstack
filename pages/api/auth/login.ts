import connectMongo from "@/utils/lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/utils/models/users";
import { comparePassword } from "@/utils/lib/hashPassword";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();

    const { username, password } = req.body;

    const user = await Users.findOne({
      username,
    });

    if (!user) {
      return res.json({ message: "user does not exist" });
    }

    const validatePass = await comparePassword(password, user.password);

    if (!validatePass) {
      return res.json({ message: "wrong password" });
    }

    return res.json({ user });
  } catch (error) {}
}
