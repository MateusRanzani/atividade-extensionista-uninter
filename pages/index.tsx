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

const Home: NextPage = () => {
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
    <div>
      <>{console.log(useSession)}</>
      <div className="totalPageHome">
        <div className="header-homePage">
          <p className="home--title">Olá! Seja bem vindo!</p>
          <p className="home--subtitle my-4">
            Esta é uma rede social dedicada a amantes da natureza que querem
            fazer a diferença no mundo.
            <br />
            Você é um deles?
          </p>
          <div>
            <br />
            <button
              onClick={() => signIn("auth0")}
              className="rounded-full text-[1.8rem]  bg-[#FF9900] hover:[#df8703 ] text-[white] mx-3 px-5 py-1 hover:bg-[#da8402] duration-300"
            >
              CADASTRAR
            </button>
            <button
              onClick={() => signIn("auth0")}
              className="rounded-full text-[1.8rem]  bg-[#04D361] text-[white] mx-3 px-5 py-1 hover:bg-[#01b653] duration-300 "
            >
              FAZER LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
