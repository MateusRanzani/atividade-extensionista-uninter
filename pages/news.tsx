import { useSession } from "next-auth/react";

import NewsComponent from "../components/newsComponent";

const NewsPage = ({ news }: any) => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="totalPageNews">
        <div className="subscript">
          <div className="subAlingn">
            <div
              className="cicleSub"
              style={{ backgroundColor: "rgba(4, 211, 97, 0.45)" }}
            />
            Notícia
          </div>
          <div className="subAlingn">
            <div
              className="cicleSub"
              style={{ backgroundColor: "rgba(255, 153, 0, 0.45)" }}
            />
            Release
          </div>
          <div className="subAlingn">
            <div
              className="cicleSub"
              style={{ backgroundColor: "rgba(255, 153, 0, 0.1)" }}
            />
            Outro
          </div>
        </div>
        <div className="contentNewsPage ">
          <div className="flex flex-wrap justify-center">
            {news.items.map((thisNew: any, keyId: any) => {
              return (
                <div key={keyId}>
                  <NewsComponent news={thisNew} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://servicodados.ibge.gov.br/api/v3/noticias/");
  const data = await res.json();
  return {
    props: {
      news: data,
    },
  };
}

export default NewsPage;
