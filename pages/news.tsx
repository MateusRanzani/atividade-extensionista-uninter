import { useSession } from "next-auth/react";

import NewsComponent from "../components/newsComponent";

const NewsPage = ({ news }: any) => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="totalPageNews">
        <div className="contentNewsPage flex flex-wrap justify-center">
          {news.items.map((thisNew: any, keyId: any) => {
            return (
              <div key={keyId}>

                <NewsComponent news={thisNew} />
                
              </div>
            );
          })}
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
