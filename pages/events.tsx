import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import api from "../utils/api";

interface Teacher {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
  coins: number;
  courses: string[];
  available_hours: Record<string, number[]>;
  available_locations: string[];
  reviews: Record<string, unknown>[];
  appointments: Record<string, unknown>[];
}

const Events: NextPage = () => {
  let [user, setUser] = useState<Teacher>({} as Teacher);
  const { data: session, status } = useSession();

  const isEmptyObj = (obj: any) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  };

  const fetchUser = () => {
    if (session !== undefined) {
      api(`/api/user/${session?.user?.email}`)
        .then((response) => {
          const teachers: Teacher = response.data;
          user = teachers;
          setUser(user);
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="totalPageNews">
      <div className="contentNewsPage">
        <div className="text-center w-full h-[50px] bg-[#04D361] text-[white] text-[35px] rounded-[30px]">
          <b>EVENTOS</b>
        </div>

       
      </div>
    </div>
  );
};

export default Events;
