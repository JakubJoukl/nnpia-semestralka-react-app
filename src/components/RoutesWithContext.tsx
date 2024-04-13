import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import HomePage from "./HomePage";
import UserContext from "./UserContext";
import CalendarPage from "./CalendarPage";
import MyTermsPage from "./MyTermsPage";
import FreeTimeSlotsPage from "./FreeTimeSlotsPage";

function RoutesWithContext() {
  const [username, setUsername, jwtToken, setJwtToken] =
    useContext(UserContext);

  return username == null ? (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="*" element={<ErrorPage></ErrorPage>} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/kalendarTerminu" element={<CalendarPage></CalendarPage>} />
      <Route path="/mojeTerminy" element={<MyTermsPage></MyTermsPage>} />
      <Route
        path="/volneTerminy"
        element={<FreeTimeSlotsPage></FreeTimeSlotsPage>}
      />
      <Route path="*" element={<ErrorPage></ErrorPage>} />
    </Routes>
  );
}

export default RoutesWithContext;
