import connectMongo from "@/lib/connectDB";
import Notes from "@/models/notes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();

    const id = "64395fb6f20788a36da4d5fe";

    const note = await Notes.create({
      title: "Test note",
      content: "This is a test note",
      userId: id,
    });

    res.json({ note });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
