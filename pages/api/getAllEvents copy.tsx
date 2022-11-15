// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Collection, ObjectID } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

type ErrorResponseType = {
  error: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | any>
): Promise<void> => {
  if (req.method === "GET") {
    const { db } = await connect();
    const response = await db.collection("events").find({});
    const data = await response.toArray();

    if (!response) {
      res.status(400).json({ error: "Events not found" });
      return;
    }

    res.status(200).json({ data });
    return;
  } else {
    res.status(400).json({ error: "Wrong request method" });
    return;
  }
};
