//import ListGroup from "./components/ListGroup";
//import Alert from "./components/Alert";
import "./index.css";
import LibraryHeader from "./components/LibraryHeader";
import { UserProvider } from "./components/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ErrorPage from "./components/ErrorPage";
import RoutesWithContext from "./components/RoutesWithContext";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { csCZ as coreCsCZ } from "@mui/material/locale";
import MyAlert from "./components/MyAlert";
import MyErrorBoundary from "./components/MyErrorBoundary";

const theme = createTheme(coreCsCZ);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <LibraryHeader></LibraryHeader>
          <RoutesWithContext></RoutesWithContext>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
