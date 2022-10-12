function NewsComponent({ news }: any) {
  return (
    <>
      <div className="">
        <a href={`${news.link}`}>
          <div className="cardOfNew">
            <p className="titleOfNew">{news.titulo}</p>
            <p className="newIntroduction">{news.introducao}</p>
          </div>
        </a>
      </div>
    </>
  );
}

export default NewsComponent;
