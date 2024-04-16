import React, { useContext, useState } from "react";
import "../css/login.css";
import "../css/register.css";
import MyAlert from "./MyAlert";

function Register() {
  const [usernameForm, setUsernameForm] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());

  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");

  let telo = JSON.stringify({
    username: usernameForm,
    heslo: password,
    jmeno: name,
    prijmeni: surname,
    datumNarozeni: birthDate,
  });

  const handleRegister = () => {
    let url = "http://localhost:8080/api/v1/security/register";

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: telo,
    })
      .then((response) => {
        console.log(
          "Request probehl, status: " +
            response.status +
            ", odpoved: " +
            response
        );
        if (response.status === 200 || response.status === 201) {
          return response.text();
        } else {
          return response.text().then((errorText) => {
            setError(errorText);
            setOpen(true);
          });
        }
      })
      .catch((error) => {
        setError(error);
        setOpen(true);
      });
  };

  return (
    <div className="registerCover">
      <div className="registerContainer">
        <label>Jméno</label>
        <input
          type="text"
          name="name"
          id="name"
          className="registerInput"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Příjmení</label>
        <input
          type="text"
          name="surname"
          id="surname"
          className="registerInput"
          onChange={(e) => setSurname(e.target.value)}
        />
        <label>Datum narození</label>
        <input
          type="date"
          name="birthdate"
          id="birthdate"
          className="registerInput"
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <label>Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="registerInput"
          onChange={(e) => setUsernameForm(e.target.value)}
        />
        <label>Heslo</label>
        <input
          type="password"
          name="password"
          id="password"
          className="registerInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          name="submit"
          id="submit"
          value="Registrovat"
          className="registerButton"
          onClick={handleRegister}
        />
        {error && (
          <MyAlert open={open} setOpen={setOpen}>
            {error}
          </MyAlert>
        )}
      </div>
    </div>
  );
}

export default Register;
