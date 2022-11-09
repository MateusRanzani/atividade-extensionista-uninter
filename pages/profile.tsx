import { useSession } from "next-auth/react";
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
    console.log(user)
  }, [session]);

  return (
    <>
      <div className="componentPage">
        <div className="containerPageProfile flex justify-center items-center">
          {!isEmptyObj(user) ? (
            <div className="profileCard flex">
              {user.name}
              <br />
              {user.email}
              <br />
              {user.cellphone}
            </div>
          ): (
            <div>
              Finalizar Cadastro de usuario
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
