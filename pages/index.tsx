import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback, useState } from "react";
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
    api(`/api/user/${session?.user?.email}`)
      .then((response) => {
        const teachers: Teacher = response.data;
        user = teachers;
        setUser(user);
      })
      .catch((error) => {});
  };

  useCallback(() => {
    if (session !== undefined) {
      fetchUser();
    }
  }, [session]);

  return (
    <div className="contentAllPage">
      <div className="headerHomePage">
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
              className="buttonsIndexPage rounded-full text-[1.8rem]  bg-[#FF9900] hover:[#df8703 ] text-[white] mx-3 px-5 py-1 hover:bg-[#da8402] duration-300"
            >
              CADASTRAR
            </button>
            <button
              onClick={(): Promise<void> => signIn()}
              className="buttonsIndexPage rounded-full text-[1.8rem]  bg-[#04D361] text-[white] mx-3 px-5 py-1 hover:bg-[#01b653] duration-300 "
            >
              FAZER LOGIN
            </button>
          </div>
        </div>
        <div className="footerHeader">
          <div className="absolute bottom-0 text-center">
            <p className="text-[1rem]">
              O objetivo deste projeto é de utilizar a tecnologia como uma
              aliada na <br /> conscientização sobre as mudanças climáticas.{" "}
              <br /> Quer saber mais?
            </p>

            <div className="flex justify-center my-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="secondContainer">
        <div className="headerSecondContainer">
          <div className="gridTemplateBanner1">
            <div className="contentImagesBanner1">
              <img
                className="informationLeftSideContentOneImg"
                src="/assets/homePage/image1.svg"
                alt=""
              />
              <img
                className="svgBlobMiniature flex absolute"
                src="/assets/homePage/image2.svg"
                alt=""
              />
            </div>
          </div>
          <div className="contentTextBanner1">
            As mudanças climáticas são um fenômeno global que tem impactos
            significativos em economias e comunidades em todo o mundo. Segundo o
            Painel Intergovernamental de Mudanças Climáticas (IPCC), a
            temperatura global pode aumentar entre 1,8ºC e 4,0ºC nos próximos
            100 anos, e o nível médio do mar pode subir entre 0,18m e 0,59m, o
            que pode afetar seriamente as atividades humanas e os ecossistemas
            terrestres. Essas mudanças são intensificadas pela ação humana.
          </div>
        </div>
        <div className="footerSecondContainer">
          <div className="contentTextBanner1">
            O objetivo deste projeto é empregar a tecnologia para aumentar a
            conscientização sobre as mudanças climáticas e possibilitar meios
            mais fáceis para a denúncia de focos de incêndio e desmatamento
            ilegal. Este projeto foi planejado com base na 13ª ODS da ONU, que
            busca promover ações contra a mudança global do clima.
          </div>
          <div>
            <div className="contentImagesBanner1">
              <img
                className="informationRightSideContentTwoImg"
                src="/assets/homePage/image3.svg"
                alt=""
              />
              <img
                className="informationRightSideContentTwoImg_"
                src="/assets/homePage/image4.svg"
                alt=""
              />

              <img
                src="/assets/homePage/image5.svg"
                className="svgBlobMiniature--two flex absolute"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default Home;
