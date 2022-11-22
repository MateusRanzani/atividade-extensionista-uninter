import UserInterface from "./UserInterface";

interface EventsInterface {
  _id: string;
  event_name: string;
  city: string;
  country: string;
  description: string;
  responsible: UserInterface;
  members: UserInterface[];
  date: string;
}

export default EventsInterface;
