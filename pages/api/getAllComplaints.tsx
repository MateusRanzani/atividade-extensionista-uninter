// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

type ErrorResponseType = {
  error: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | string>
): Promise<void> => {
  if (req.method === "GET") {
    const { _id } = req.body;

    if (!_id) {
      res.status(400).json({ error: "Missing id on request body" });
      return;
    }

    const { db } = await connect();
    const response = await db.collection("complaints").findOne(ObjectId(_id));

    if (!response) {
      res.status(400).json({ error: "Complaint not found" });
      return;
    }

    res.status(200).json(response);
    return;
  } else {
    res.status(400).json({ error: "Wrong request method" });
    return;
  }
};
