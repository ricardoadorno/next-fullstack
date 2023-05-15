import connectMongo from "@/utils/lib/connectDB";
import Notes from "@/utils/models/notes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();

    const { userId } = req.query;

    const { title, content } = req.body;

    const note = await Notes.create({
      title,
      content,
      userId,
    });

    res.json({ note });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
