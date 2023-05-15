import connectMongo from "@/utils/lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/utils/models/users";
import { comparePassword } from "@/utils/lib/hashPassword";
import jwt from "jsonwebtoken";
import cookie from "cookie";

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

    const token = jwt.sign(
      { username: user.username, id: user._id, time: Date.now() },
      "JWT_SECRET",
      {
        expiresIn: "1d",
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("ACESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    return res.json({ user, token });
  } catch (error) {}
}
