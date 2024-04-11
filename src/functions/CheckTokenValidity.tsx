import React from "react";

export default function beforeRequest() {
  console.log("Nastavim jwt token");
  if (sessionStorage.getItem("jwt") != null) {
    let tokens = sessionStorage.getItem("jwt")!.split(".");
    let tokenScope = JSON.parse(atob(tokens[1]));
    let expirationDate = new Date(tokenScope.exp * 1000);
    if (expirationDate < new Date()) {
      sessionStorage.removeItem("jwt");
      window.location.reload();
      return false;
    }
    return true;
  }
  return false;
}
