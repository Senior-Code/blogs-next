import React from "react";
import styles from "../Styles/loading.module.css";

export default function Loading() {
  return (
    <div className={styles["Loading-section"]}>
      <div className={styles.loader}></div>
      <p>Loading...</p>
    </div>
  );
}
