import { useSession } from "next-auth/react";

import NewsComponent from "../components/newsComponent";

export const getStaticProps = async () => {
  const res = await fetch("http://servicodados.ibge.gov.br/api/v3/noticias/");
  const data = await res.json();

  return {
    props: {
      news: data,
    },
  };
};

const NewsPage = ({ news }: any) => {
  const { data: session, status } = useSession();

  return (
    <>
      {session && (
        <div className="totalPageNews">
          <div className="contentNewsPage flex flex-wrap justify-center">
            {news.items.map((thisNew: any) => {
              return (
                <div>
                  <NewsComponent news={thisNew} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default NewsPage;
