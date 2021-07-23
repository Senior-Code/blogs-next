import React, { useState } from "react";
import styles from "../styles/index.module.css";
import HomeTab from "./home";

export default function Index() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [data, setResponseData] = useState<object>({});
  const verifyLogin = (res: object) => {
    res == null ? alert("incorrect username or password") : res;
  };
  const userLogin = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: username,
        password: password,
      }),
    };
    try {
      const res = await fetch(
        "http://localhost:1337/auth/local",
        requestOptions
      ).then((r) => (r.status == 200 ? r.json() : null));
      verifyLogin(res);
      setToken(res.jwt);
      setResponseData(res.user);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {token ? (
        <div>
          <HomeTab />
        </div>
      ) : (
        <div className={styles[`home-body`]}>
          <form className={styles[`login-form`]} onSubmit={userLogin}>
            <p>Login</p>
            <input
              placeholder="Please enter your user name"
              className={styles["form-input"]}
              type="Text"
              value={username}
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
            <input
              placeholder="Please enter your password"
              className={styles["form-input"]}
              type="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <input className={styles["form-submit"]} type="submit" />
          </form>
        </div>
      )}
    </>
  );
}
