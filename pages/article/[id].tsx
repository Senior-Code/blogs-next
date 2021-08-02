import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading";
import styles from "../../styles/article.module.css";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState([]);
  const [comment, setComment] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitHandle = (event: { preventDefault: () => void }) => {
    const data = {
      message: message,
      article: Number(id),
      name: name,
    };
    const Post = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    name && message
      ? fetch("http://localhost:1337/comments", Post).then((res) => {
          console.log("Request complete! response:", res);
        })
      : alert("name and message should not be empty");

    router.reload();
  };

  useEffect(() => {
    fetch(`http://localhost:1337/articles?id=${id}`)
      .then((response) => response.json())
      .then((data) => (data ? setArticle(data) : null));
    fetch(`http://localhost:1337/comments?article=${id}`)
      .then((response) => response.json())
      .then((data) => (data ? setComment(data) : null));
  }, [id]);
  return (
    <>
      {article ? (
        <div className={styles.body}>
          {article.map((article) => {
            const date = new Date(article.updated_at);
            return (
              <div className={styles["blogs-section"]} key={article.id}>
                <div className={styles["title-section"]}>
                  <h1 className="article-title">
                    {article.title.toUpperCase()}
                  </h1>
                  <img
                    src={
                      article.image.formats.large
                        ? `http://localhost:1337${article.image.formats.large.url}`
                        : `http://localhost:1337${article.image.formats.medium.url}`
                    }
                    alt="#"
                  ></img>
                  <p className="upload-date">
                    {article.author.name} | {date.toUTCString()}
                  </p>
                </div>
                <ReactMarkdown
                  skipHtml={true}
                  children={article.content}
                  className={styles["content-section"]}
                  components={article}
                />
              </div>
            );
          })}

          <div className={styles["article-comments"]}>
            <div className={styles["comment-header"]}>
              <u> Comment Section: </u>
              <p>Name:</p>
              <input
                type={"Text"}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <p>Message:</p>
              <input
                type={"Text"}
                placeholder="Enter your comment here"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
              />
              <button
                className={styles["btn-comment"]}
                type="submit"
                onClick={onSubmitHandle}
              >
                Comment
              </button>
            </div>
            {comment.length != 0 ? (
              comment.map((comment) => {
                return (
                  <div className={styles["user-comment"]} key={comment.id}>
                    <p className={styles["comment-profile"]}>
                      {comment.name.toUpperCase()}
                    </p>
                    <div className={styles["user-profile"]}>
                      <p>{comment.message}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ marginLeft: "auto", marginTop: 20 + "px" }}>
                No Comment Found . . . .
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
