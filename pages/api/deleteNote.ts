import connectMongo from "@/utils/lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import Notes from "@/utils/models/notes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();

    const { id } = req.body;

    try {
      await Notes.findByIdAndDelete(id).then((note) => {
        if (!note) {
          return res.status(400).json({ msg: "No note found" });
        } else {
          return res.status(200).json(note);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
