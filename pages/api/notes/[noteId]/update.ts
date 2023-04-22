import connectMongo from "@/utils/lib/connectDB";
import Notes from "@/utils/models/notes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();

    const { noteId } = req.query;

    const { title, content } = req.body;

    const editUser = await Notes.findByIdAndUpdate(noteId, { title, content });

    res.json({ editUser });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
