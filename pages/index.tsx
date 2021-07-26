import React, { useEffect, useState } from "react";
import styles from "../styles/index.module.css";
import Loading from "../components/Loading";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [articlesList, setArticlesList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:1337/articles")
      .then((response) => response.json())
      .then((data) => setArticlesList(data));
  }, []);

  return (
    <>
      {articlesList ? (
        <div className={styles[`main-section`]}>
          {articlesList.map((articles) => {
            const date = new Date(articles.updated_at);
            return (
              <Link href={`/article/${articles.id}`} key={articles.id}>
                <div className={styles[`blogs-section`]}>
                  <div className={styles["title-section"]}>
                    <h1 className="article-title">
                      {articles.title.toUpperCase()}
                    </h1>
                    <img
                      src={`http://localhost:1337${articles.image.formats.small.url}`}
                      alt="#"
                    ></img>
                    <p className="upload-date">
                      {articles.author.name} | {date.toUTCString()}
                    </p>
                  </div>
                  <ReactMarkdown
                    skipHtml={true}
                    children={articles.description}
                    className={styles["content-section"]}
                    components={articles}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
