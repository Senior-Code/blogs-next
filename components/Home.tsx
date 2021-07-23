import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles[`tab-section`]}>
        <ul>
          <li>token</li>
        </ul>
      </div>
      <div className={styles[`main-section`]}>
        <div className={styles[`article-tab`]}>Tab</div>
        <div>Article</div>
      </div>
    </div>
  );
}
