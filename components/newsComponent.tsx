function NewsComponent({ news }: any) {
  return (
    <>
    {/* #04D361 */}
      <div className="">
        <a href={`${news.link}`} target="_blank">
          <div className="cardOfNew" style={{backgroundColor:`${news.tipo === "Notícia"? "rgba(4, 211, 97, 0.45)" : news.tipo === "Release"? "rgba(255, 153, 0, 0.45)" : "rgba(255, 153, 0, 0.1)" }`}}>
            <p className="titleOfNew">{news.titulo}</p>
            <p className="newIntroduction">{news.introducao}</p>
          </div>
        </a>
      </div>
    </>
  );
}

export default NewsComponent;
