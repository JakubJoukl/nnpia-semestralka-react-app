import React, { ReactNode, useEffect, useState, useContext } from "react";
import "../cors";
import "../css/login.css";
import UserContext from "./UserContext";
import MyAlert from "./MyAlert";

//import "../css/header.css";

export default function Login() {
  const [username, setUsername, jwtToken, setJwtToken] =
    useContext(UserContext);

  const [usernameForm, setUsernameForm] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = () => {
    console.log("Uživatelské jméno:", usernameForm);
    console.log("Heslo:", password);

    let url = "http://localhost:8080/api/v1/security/login";
    const base64encodedData = btoa(`${usernameForm}:${password}`);
    //console.log(base64encodedData);

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
        Authorization: "Basic " + base64encodedData,
      },
    })
      .then((response) => {
        console.log(
          "Request probehl, status: " +
            response.status +
            ", odpoved: " +
            response
        );
        if (response.status === 200) {
          return response.text().then((response) => {
            if (response != null) {
              var tokens = response.split(".");
              console.log(response);
              let tokenScope = JSON.parse(atob(tokens[1]));
              console.log(JSON.parse(atob(tokens[0])));
              console.log(JSON.parse(atob(tokens[1])));
              setUsername(usernameForm);
              setJwtToken(response);

              console.log("Username: " + useContext(UserContext).username);
              console.log("Token: " + useContext(UserContext).jwtToken);
            }
          });
        } else {
          return response.text().then((errorText) => {
            setError("Chyba při přihlašování.");
            setOpen(true);
          });
        }
      })
      .catch((error) => {
        setError("Chyba při komunikaci s backendem");
        setOpen(true);
      });
  };

  return (
    <div className="loginContainer">
      <div className="noGrow">
        <label>Uživatelské jméno</label>
        <input
          className="loginInput"
          type="text"
          name="usernameForm"
          value={usernameForm}
          onChange={(e) => setUsernameForm(e.target.value)}
        />
      </div>
      <div className="noGrow">
        <label>Heslo</label>
        <input
          className="loginInput"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input
        className="loginButton"
        type="submit"
        name="submit"
        onClick={handleLogin}
        value="Přihlásit se"
      />
      {error && (
        <MyAlert open={open} setOpen={setOpen}>
          {error}
        </MyAlert>
      )}
    </div>
  );
}
