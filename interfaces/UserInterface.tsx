import ComplaintsInterface from "./ComplaintsInterface";
import EventsInterface from "./EventsInterface";

interface UserInterface {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  city: string;
  country: string;
  events: EventsInterface[];
  complaints: ComplaintsInterface[];
}

export default UserInterface;
