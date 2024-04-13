//import ListGroup from "./components/ListGroup";
//import Alert from "./components/Alert";
import "./index.css";
import LibraryHeader from "./components/LibraryHeader";
import { UserProvider } from "./components/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ErrorPage from "./components/ErrorPage";
import RoutesWithContext from "./components/RoutesWithContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <LibraryHeader></LibraryHeader>
        <RoutesWithContext></RoutesWithContext>
      </Router>
    </UserProvider>
  );
}

export default App;
