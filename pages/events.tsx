import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import EventsInterface from "../interfaces/EventsInterface";
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
  let [allEvents, setAllEvents] = useState<EventsInterface[]>([]);
  const { data: session, status } = useSession();

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

  const getAllEvents = () => {
    api(`/api/getAllEvents`)
      .then((res) => {
        allEvents = res.data.data;
        setAllEvents(allEvents);
      })
      .catch((error) => {});
  };

  const isEmptyObj = (obj: any) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="totalPageNews">
      <div className="contentNewsPageEvent">
        <div className="text-center w-full h-[50px] bg-[#04D361] text-[white] text-[35px] rounded-[30px]">
          <b>EVENTOS</b>
        </div>

        {allEvents.map((events) => (
          <div className="w-full mt-4 h-[250px] bg-[orange] text-[white] text-[35px] rounded-[30px]">
            {events.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
