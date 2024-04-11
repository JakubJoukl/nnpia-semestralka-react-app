//import ListGroup from "./components/ListGroup";
//import Alert from "./components/Alert";
import "./index.css";
import LibraryHeader from "./components/LibraryHeader";
import { UserProvider } from "./components/UserContext";

/*let username = "";
if (sessionStorage.getItem("jwt") != null) {
  let tokens = sessionStorage.getItem("jwt")!.split(".");
  let tokenScope = JSON.parse(atob(tokens[1]));
  console.log(tokenScope);
  username = tokenScope.sub;
}*/

function App() {
  return (
    /*<Header
      rightSide={
        sessionStorage.getItem("jwt") == null ? (
          <Login>''</Login>
        ) : (
          <p>Vítej {username}</p>
        )
      }
    >
      NNPIA rezervační systém
    </Header>
    */
    <UserProvider>
      <LibraryHeader></LibraryHeader>
    </UserProvider>
  );
}

export default App;
