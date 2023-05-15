import connectMongo from "@/utils/lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import Notes from "@/utils/models/notes";
import { validateRoute } from "@/utils/lib/auth";

// export default validateRoute(
//   async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//       await connectMongo();
//       const { userId } = req.query;

//       try {
//         await Notes.find({ userId: userId }).then((notes) => {
//           if (!notes) {
//             return res.status(400).json({ msg: "No notes found" });
//           } else {
//             return res.status(200).json(notes);
//           }
//         });
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const { userId } = req.query;

    try {
      await Notes.find({ userId: userId }).then((notes) => {
        if (!notes) {
          return res.status(400).json({ msg: "No notes found" });
        } else {
          return res.status(200).json(notes);
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
