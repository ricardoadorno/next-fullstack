import jwt from "jsonwebtoken";
import connectMongo from "@/utils/lib/connectDB";
import Users from "@/utils/models/users";
import { NextApiRequest, NextApiResponse } from "next";

export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.ACESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "JWT_SECRET") as {
          id: string;
        };

        await connectMongo();

        user = await Users.findById(id);
        if (!user) {
          return res.status(401).json({ message: "Not authorized" });
        }
      } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Not authorized" });
      }
      return handler(req, res, user);
    }

    return res.status(401).json({ message: "Not authorized" });
  };
};
