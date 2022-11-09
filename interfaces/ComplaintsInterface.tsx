import UserInterface from "./UserInterface";

interface ComplaintsInterface {
  _id: string;
  responsible: UserInterface;
  type: string;
  description: string;
  city: string;
  country: string;
  date: string;
}

export default ComplaintsInterface;
