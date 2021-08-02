import { useState } from "react";
import styles from "../styles/khmerload.module.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

export default function Khmerload() {
  const [page, setPage] = useState(1);
  const [view, setView] = useState(5);
  const [extend, setExtend] = useState(false);
  const handleExtend = () => {
    setExtend(!extend);
    console.log(extend);
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
              background: "#fff",
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
      <div className={styles["articles-section"]}>
        <div>
          <div></div>
        </div>
      </div>
    </>
  );
}
