import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import NewsComponent from "../components/newsComponent";
import UserInterface from "../interfaces/UserInterface";
import api from "../utils/api";

const Profile = ({ news }: any) => {
  const { data: session, status } = useSession();
  let [user, setUser] = useState<UserInterface>({} as UserInterface);

  const fetchUser = () => {
    api(`/api/user/${session?.user?.email}`)
      .then((response) => {
        const teachers: UserInterface = response.data;
        user = teachers;
        setUser(user);
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
    if (session !== undefined) {
      fetchUser();
    }
    console.log(user);
  }, [session]);

  return (
    <>
      <div className="componentPage">
        <div className="containerPageProfile flex justify-center items-center">
          {!isEmptyObj(user) ? (
            <div className="profileCard text-center">

                <div className="flex justify-center w-full mb-8">
                  <Image
                    loader={myLoader}
                    src="me.png"
                    alt="Picture of the author"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="">
                  <p>Nome: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Tel:{user.cellphone}</p>
                </div>
                <div className="flex justify-center">
                  <p>{user.city}, &nbsp;</p>
                  <p>{user.country}</p>
                </div>
                

            </div>
          ) : (
            <div>Finalizar Cadastro de usuario</div>
          )}
        </div>
      </div>
    </>
  );
};

const myLoader = ({ src, width, quality }: any) => {
  return `https://img.freepik.com/free-icon/user_318-804690.jpg?w=360`;
};

export default Profile;
