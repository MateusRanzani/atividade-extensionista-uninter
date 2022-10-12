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
    <div className="contentAllPage">
      <div className="headerHomePage" >
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
        <div
          style={{
            width: "100%",
            display: "flex",
            flex: "1",
            position: "relative",
            justifyContent: "center",
          }}
        >
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

      <div className="projectInformation--index1">
        <div className="informationLeftSide--index">
          <div style={{ height: "fit-content", display: "inline-flex" }}>
            <img
              src="/assets/homePage/image1.svg"
              alt=""
              style={{ width: "25rem" }}
            />
            <img
              className="svgBlobMiniature flex absolute"
              src="/assets/homePage/image2.svg"
              alt=""
              style={{
                width: "25%",
                height: "52%",
                position: "absolute",
                bottom: "0rem",
                right: "8rem",
                display: "inline-block",
              }}
            />
          </div>
        </div>

        <div className="informationRigthSide--index text-center">
          As mudanças climáticas são um evento transnacional, cujo impactos
          estão desregulando economias nacionais e afetando pessoas em todos os
          lugares do mundo. Projeções do Painel Intergovernamental de Mudanças
          Climáticas (IPCC) indicam que nos próximos 100 anos poderá haver um
          aumento da temperatura média global entre 1,8ºC e 4,0ºC. e um aumento
          no nível médio do mar entre 0,18m e 0,59m, o que pode afetar
          significativamente as atividades humanas e os ecossistemas terrestres.
          Atualmente, essas mudanças têm ocorrido de forma intensa em razão da
          ação do homem.
        </div>
      </div>

      <div className="projectInformation--index2">
        <div className="informationLeftSide-two--index flex items-center text-center ">
          O objetivo deste projeto é de utilizar a tecnologia como uma aliada na
          conscientização sobre as mudanças climáticas, assim como possibilitar
          e facilitar os meios de denúncias, tanto para focos de incêndio quanto
          para desmatamento ilegal.
          <br />
          <br />O planejamento foi feito com base na 13ª ODS da ONU – Ação
          contra a mudança global do clima
        </div>

        <div className="informationRigthSide-two--index ">
          <div style={{ height: "fit-content", display: "inline-flex" }}>
            <img
              src="/assets/homePage/image3.svg"
              alt=""
              style={{
                width: "30rem",
              }}
            />

            <img
              src="/assets/homePage/image4.svg"
              alt=""
              style={{
                width: "30%",
                height: "52%",
                position: "absolute",
                bottom: "-0.1rem",
                left: "-0.4rem",
                display: "inline-block",
              }}
            />

            <img
              src="/assets/homePage/image5.svg"
              className="svgBlobMiniature--two flex absolute"
              alt=""
              style={{
                width: "30%",
                height: "52%",
                position: "absolute",
                top: "-0.1rem",
                right: "1rem",
                display: "inline-block",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
