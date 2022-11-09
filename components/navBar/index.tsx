import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import api from "../../utils/api";
import TeacherInterface from "../../interfaces/UserInterface";

const NavBar: NextPage = (props) => {
  const { data: session, status } = useSession();
  let [user, setUser] = useState<TeacherInterface>({} as TeacherInterface);

  const fetchUser = () => {
    api(`/api/user/${session?.user?.email}`)
      .then((response) => {
        const teachers: TeacherInterface = response.data;
        user = teachers;
        setUser(user);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (session !== undefined) {
      fetchUser();
    }
  }, [session]);

  return (
    <nav>
      <div className="navBar flex justify-center items-center border-b-[1px] border-[#e6e5e5]">
        <div className="navBar_Content flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <Link href="/">
                <div className="icon--logo">
                  <Image
                    loader={myLoader}
                    src="me.png"
                    alt="Picture of the author"
                    width={60}
                    height={45}
                  />
                </div>
              </Link>
            </div>

            <div className="mr-10">
              <Link href="/events">
                <a className="--button">EVENTOS</a>
              </Link>
            </div>
            <div className="mr-10">
              <Link href="/news">
                <a className="--button">NOTÍCIAS</a>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {!session && (
              <button
                className="border-l-2 border-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
                onClick={() => signIn("auth0")}
              >
                Login
              </button>
            )}
            {session && (
              <div className="flex items-center">
                <Link href="/profile">
                  <a className="flex items-center text-sm mr-8 text-[#a9a9a9]">
                    <p>Seja bem vindo &nbsp;</p>
                    <p>{user.name}</p>
                  </a>
                </Link>

                <Link href="/profile">
                  <a className="text-[#DF3A3A]" onClick={() => signOut()}>
                    SAIR
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const myLoader = ({ src, width, quality }: any) => {
  return "/assets/logoGreen.png";
};

export default NavBar;
