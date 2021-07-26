import React, { useEffect, useState } from "react";
import styles from "../styles/articles.module.css";
import Loading from "../components/Loading";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function Articles() {
  const [categories, setCategoires] = useState([]);
  const [articlesList, setArticlesList] = useState([]);
  const [selectTab, setSelectTab] = useState(0);
  const handleonClicked = (index: number) => {
    setSelectTab(index);
  };
  useEffect(() => {
    let queryString: string = "";
    if (selectTab == 0) {
      queryString = "";
    } else {
      queryString = `?category=${selectTab}`;
    }
    fetch("http://localhost:1337/categories")
      .then((response) => response.json())
      .then((data) => setCategoires(data));
    fetch(`http://localhost:1337/articles${queryString}`)
      .then((response) => response.json())
      .then((data) => setArticlesList(data));
  }, [selectTab]);

  return (
    <>
      {categories && articlesList ? (
        <div className={styles.body}>
          <div className={styles[`tab-section`]}>
            <li
              onClick={(e) => handleonClicked(0)}
              style={{
                backgroundColor: selectTab === 0 ? "#f5f5f5" : "",
                borderBottom: selectTab === 0 ? "#353535 5px solid" : "",
              }}
            >
              All
            </li>
            {categories.map((category) => {
              return (
                <li
                  key={category.id}
                  onClick={(e) => handleonClicked(category.id)}
                  style={{
                    background: selectTab === category.id ? "#f5f5f5" : "",
                    borderBottom:
                      selectTab === category.id ? "#353535 5px solid" : "",
                  }}
                >
                  {category.name}
                </li>
              );
            })}
          </div>
          <div className={styles[`main-section`]}>
            {articlesList.map((articles) => {
              const date = new Date(articles.updated_at);
              return (
                <Link href={`/article/${articles.id}`} key={articles.id}>
                  <div className={styles[`blogs-section`]}>
                    <div className="title-section">
                      <h1 className="article-title">
                        {articles.title.toUpperCase()}
                      </h1>
                      <img
                        src={`http://localhost:1337${articles.image.formats.thumbnail.url}`}
                        alt="#"
                      ></img>
                      <p className="upload-date">
                        {articles.author.name} | {date.toUTCString()}
                      </p>
                    </div>
                    <ReactMarkdown
                      skipHtml={true}
                      children={
                        articles.content.substring(600, length) +
                        " . . . . .  See More"
                      }
                      components={articles}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
