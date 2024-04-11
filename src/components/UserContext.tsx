import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);

  return (
    <UserContext.Provider
      value={[username, setUsername, jwtToken, setJwtToken]}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
