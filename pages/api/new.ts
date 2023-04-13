import connectMongo from "@/lib/connectDB";
import Users from "@/models/users";
import Notes from "@/models/notes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();

    const { username, password, title, body } = req.body;

    const user = await Users.create({ username, password });

    const note = await Notes.create({ title, body });

    user.notes.push(note._id);

    await user.save();

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
