import styles from "../styles/nav.module.css";
import Image from "next/image";
import logo from "../Resources/logo.png";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div className={styles.headersection}>
        <div className={styles.headerdiv}>
          <div className={styles.titlesection}>
            <Image
              src={logo}
              className={styles.titlelogo}
              width={55}
              height={55}
              alt="logo"
            ></Image>
            <Link href="/">
              <p className={styles.titlename}>
                CAMBODIA <br />
                TECH TALK
              </p>
            </Link>
          </div>
        </div>
        <ul className={styles.tabsection}>
          <li className={styles.tabli}>
            <Link href="/">HOME</Link>
          </li>
          <li className={styles.tabli}>
            <Link href="/articles">ARTICLES</Link>
          </li>
          <li className={styles.tabli}>
            <Link href="/aboutme">ABOUT ME</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
