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
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="projectInformation--index">
        <div className="informationLeftSide--index">
          <svg
            className="imageSvg "
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="mask0" mask-type="alpha">
              <path
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
            </mask>

            <g mask="url(#mask0)">
              <path
                fill="#FF0066"
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
              <image
                className="my-img"
                x="0"
                y="0"
                href="https://static.mundoeducacao.uol.com.br/mundoeducacao/2020/10/queimadas-florestais.jpg"
              />
            </g>
          </svg>

          <svg
            className="svgBlobMiniature flex absolute"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="mask0" mask-type="alpha">
              <path
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
            </mask>

            <g mask="url(#mask0)">
              <path
                fill="#FF0066"
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
              <image
                className="my-img-blobMiniature"
                x="25"
                y="40"
                href="https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/queimadas-incendio-fogo-pantanal-32.jpg?w=1900&h=1269"
              />
            </g>
          </svg>
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

      <div className="projectInformation--index">
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
          <svg
            className="imageSvg "
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="mask0" mask-type="alpha">
              <path
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
            </mask>

            <g mask="url(#mask0)">
              <path
                fill="#FF0066"
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
              <image
                className="my-img-two"
                x="0"
                y="40"
                href="https://t.ctcdn.com.br/ox1C0Pc9tan1smqBlFtNZJszYrs=/1400x788/smart/i433700.jpeg"
              />
            </g>
          </svg>

          <svg
            className="svgBlobMiniature-two flex absolute"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="mask0" mask-type="alpha">
              <path
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
            </mask>

            <g mask="url(#mask0)">
              <path
                fill="#FF0066"
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
              <image
                className="my-img-blobMiniature"
                x="25"
                y="40"
                href="https://img.freepik.com/fotos-premium/bela-natureza-no-parque-na-natureza_261642-2196.jpg"
              />
            </g>
          </svg>

          <svg
            className="svgBlobMiniature-two flex absolute"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="mask0" mask-type="alpha">
              <path
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
            </mask>

            <g mask="url(#mask0)">
              <path
                fill="#FF0066"
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
              <image
                className="my-img-blobMiniature"
                x="25"
                y="40"
                href="https://img.freepik.com/fotos-premium/bela-natureza-no-parque-na-natureza_261642-2196.jpg"
              />
            </g>
          </svg>

          <svg
            className="svgBlobMiniature--two flex absolute"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="mask0" mask-type="alpha">
              <path
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
            </mask>

            <g mask="url(#mask0)">
              <path
                fill="#FF0066"
                d="M65.5,-19.3C73.6,3.7,61.1,35.3,39.6,49.9C18,64.5,-12.6,62,-33.8,46.6C-54.9,31.2,-66.5,2.9,-59.3,-18.9C-52.1,-40.7,-26.1,-55.9,1.3,-56.3C28.7,-56.8,57.4,-42.4,65.5,-19.3Z"
                transform="translate(100 100)"
              />
              <image
                className="my-img-blobMiniature"
                x="25"
                y="40"
                href="https://s1.1zoom.me/big0/994/260356-svetik.jpg"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;
