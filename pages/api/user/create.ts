import connectMongo from "@/utils/lib/connectDB";
import Users from "@/utils/models/users";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/utils/lib/hashPassword";
import cookie from "cookie";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign(
      { username: newUser.username, id: newUser._id, time: Date.now() },
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

    res.json({ newUser, token });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
