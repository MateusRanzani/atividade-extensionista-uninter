// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Cursor, ObjectId, ObjectID } from "mongodb";
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
  res: NextApiResponse<ErrorResponseType | any>
): Promise<void> => {
  if (req.method === "PUT") {
    const { _id, member } = req.body;

    if (!_id || !member) {
      res.status(400).json({ error: "Missing body parameter" });
      return;
    }

    const { db } = await connect();

    const event = await db.collection("events").findOne(ObjectId(_id));

    if (event) {
      let newMember = event.members.push(member);

      console.log(newMember);

      const response = await db.collection("events").updateOne(
        { _id: ObjectId(_id) }, // Filter
        { $set: { members: newMember } }, // Update
        { upsert: true } // add document with req.body._id if not exists
      );

      res.status(200).json(event.members);
    }
  } else {
    res.status(400).json({ error: "Wrong request method" });
    return;
  }
};
