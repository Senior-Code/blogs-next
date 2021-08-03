import { useEffect, useState } from "react";
import styles from "../styles/khmerload.module.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import Loading from "../components/Loading";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://graph-beta.ml.groupincorp.com/",
});

function Khmerload() {
  const [page, setPage] = useState(1);
  const [view, setView] = useState(5);
  const [extend, setExtend] = useState(false);
  const [articleList, setArticleList] = useState([]);
  const handleExtend = () => {
    setExtend(!extend);
  };
  const handleView = (value) => {
    setView(value);
    setExtend(false);
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    page == 1 ? setPage(1) : setPage(page - 1);
  };
  const Query = gql`
    query ($page: Int!, $pageSize: Int!) {
      articleList(pagination: { page: $page, size: $pageSize }) {
        data {
          summary
          id
          title
          content
        }
      }
    }
  `;
  const { error, data } = useQuery(Query, {
    variables: {
      page: page,
      pageSize: view,
    },
  });
  useEffect(() => {
    if (data) setArticleList(data.articleList.data);
  }, [data]);
  return (
    <>
      <div className={styles["header-section"]}>
        <div className={styles.pagination}>
          <button onClick={handlePreviousPage}>
            <IoMdArrowDropleft />
          </button>
          <p>Page : {page}</p>
          <button onClick={handleNextPage}>
            {" "}
            <IoMdArrowDropright />{" "}
          </button>
        </div>
        <div className={styles["page-size"]}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              right: 50,
              height: 40,
            }}
            className={styles[extend ? "content-show" : "content-hide"]}
          >
            <button onClick={(e) => handleView(5)}>5</button>
            <button onClick={(e) => handleView(10)}>10</button>
            <button onClick={(e) => handleView(15)}>15</button>
          </div>
          <button style={{ margin: 0 }} onClick={handleExtend}>
            {extend ? <IoMdArrowDropright /> : <IoMdArrowDropleft />}
          </button>
        </div>
      </div>
      {data ? (
        <>
          <div className={styles["articles-section"]}>
            {articleList.map((article) => {
              const objectContent = JSON.parse(article.content);
              let content = "";
              objectContent.blocks.map((e, i) => {
                e.data.text
                  ? (content += `<br /> ${e.data.text} <br /> `)
                  : null;
                e.data.file
                  ? (content += `<br /> <Image src="${e.data.file.url}" width=80% /> <br />`)
                  : null;
              });
              return (
                <div className={styles["article-blog"]} key={article.id}>
                  <div className={styles["article-title"]}>{article.title}</div>
                  <div className={styles["article-content"]}>
                    <div
                      style={{ textAlign: "justify" }}
                      dangerouslySetInnerHTML={{
                        __html: content,
                      }}
                    >
                      {/* {objectContent.blocks.map((e) =>
                        e.data.text ? e.data.text : null
                      )} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default function KhmerloadPage() {
  return (
    <ApolloProvider client={client}>
      <Khmerload />
    </ApolloProvider>
  );
}
