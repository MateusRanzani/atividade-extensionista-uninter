import type { NextPage } from "next";
import { NextScript } from "next/document";

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
    <div className="">
      <div className="cardOfNew">
        <p className="titleOfNew">{news.titulo}</p>
        <p className="introducaoOfNew">{news.introducao}</p>
      </div>
    </div>
  );
}

export default NewsComponent;
