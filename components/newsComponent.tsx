import type { NextPage } from "next";
import { NextScript } from "next/document";
import Link from "next/link";

interface NewsPropsInterface {
  news: any;
}

function NewsComponent({ news }: NewsPropsInterface) {
  const isEmptyObj = (obj: any) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  };

  return (
    <>
      <div className="">
        <Link href={`${news.link}`}>
          <a href="">
            <div className="cardOfNew">
              <p className="titleOfNew">{news.titulo}</p>
              <p className="newIntroduction">{news.introducao}</p>
            </div>
          </a>{" "}
        </Link>
      </div>
      <div></div>
    </>
  );
}

export default NewsComponent;
