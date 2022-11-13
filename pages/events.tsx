import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
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
  let [enterTheEvent, setEnterTheEvent] = useState(false);
  let [modalIsOpen, setIsOpen] = useState(false);
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

  const countOfMembers = (event: EventsInterface) => {
    let number = 0;

    event.members.forEach(() => {
      number++;
    });

    if (number === 1) {
      return `${number} pessoa participa desse evento`;
    } else {
      return `${number} pessoas participam desse evento`;
    }
  };

  const isEmptyObj = (obj: any) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="totalPageNews">
      <div className="contentNewsPageEvent">
        <div className="text-center relative w-full h-[50px] bg-[#04D361] text-[white] text-[35px] rounded-[30px]">
          <b>EVENTOS</b>

          <button
            data-tip="Criar um evento"
            data-for="test"
            data-place="left"
            className="absolute  right-[20px] m-auto top-[0px] bottom-[0px] text-[10px] whitespace-nowrap"
            onClick={() => setIsOpen((state) => true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
          <ReactTooltip id="test">{}</ReactTooltip>
        </div>

        <div className="mt-10 ">
          {allEvents.map((events) => (
            <div className="w-full p-3 mt-10 h-[250px] bg-[url('https://images5.alphacoders.com/568/thumb-1920-568879.jpg')]  text-[35px] rounded-[30px] relative">
              <div className="max-w-[50%] font-bold p-2 truncate bg-[#FF9900] text-[white] text-[23px] rounded-[30px] absolute top-[-20px]">
                {events.event_name}
              </div>

              <div className="   h-[15%] bg-[white]/[0.5]  p-1 absolute  right-[20px] rounded-[30px] text-[18px]">
                {!enterTheEvent ? (
                  <button
                    className="flex whitespace-nowrap border-l-2 border-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200  absolute  right-[20px]"
                    onClick={() => setEnterTheEvent((state) => true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6  mr-1 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                    Participar do Evento
                  </button>
                ) : (
                  <button
                    className="flex whitespace-nowrap border-l-2 border-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200  absolute  right-[20px]"
                    onClick={() => setEnterTheEvent((state) => false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                    Sair do Evento
                  </button>
                )}
              </div>

              <div className="w-[50%]  h-[70%] bg-[white]/[0.5]  p-1 absolute bottom-[20px] right-[20px] rounded-[30px] text-[18px] overflow-auto">
                <div className="text-center font-semibold">DESCRIÇÃO</div>
                <div className="bg-[white]/[0.5]  p-2 rounded-[25px] text-[16px] max-h-[50%] overflow-auto">
                  {events.description}
                </div>

                <div className="text-center font-semibold">Data</div>
                <div className="text-center text-[16px]">
                  {events.date}
                  <br />
                  {countOfMembers(events)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>I am a modal</div>
      </Modal>
    </div>
  );
};

export default Events;
