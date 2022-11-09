// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ComplaintsInterface from "../../interfaces/ComplaintsInterface";
import EventsInterface from "../../interfaces/EventsInterface";
import UserInterface from "../../interfaces/UserInterface";
import connect from "../../utils/database";

type ErrorResponseType = {
  error: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | UserInterface>
): Promise<void> => {
  if (req.method === "POST") {
    const { _id, name, email, cellphone, city, country, events, complaints } =
      req.body;

    if (
      !email ||
      !name ||
      !cellphone ||
      !city ||
      !country ||
      !events ||
      !complaints
    ) {
      res.status(400).json({ error: "Missing body parameter" });
      return;
    }

    const { db } = await connect();

    const response = await db.collection("users").insertOne({
      email,
      name,
      cellphone,
      city,
      country,
      events,
      complaints,
    });

    res.status(200).json(response.ops[0]);
  } else {
    res.status(400).json({ error: "Wrong request method" });
    return;
  }
};
