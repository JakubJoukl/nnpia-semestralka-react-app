import React, { ReactNode, useEffect, useState, useContext } from "react";
import "../cors";
import "../css/login.css";
import UserContext from "./UserContext";

//import "../css/header.css";
import { error } from "console";

export default function Login() {
  const [username, setUsername, jwtToken, setJwtToken] =
    useContext(UserContext);

  const [usernameForm, setUsernameForm] = useState("");
  const [password, setPassword] = useState("");

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
          return response.text();
        } else {
          throw new Error(
            "Neplatny pokus o prihlaseni - bud spatne jmeno a heslo nebo server neodpovida"
          );
        }
      })
      .then((response) => {
        console.log("Nastavim jwt token");
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
      })
      .catch((error) => console.error(error));
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
    </div>
  );
}