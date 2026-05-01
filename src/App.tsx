import { useState } from "react";
import Games from "./components/Games";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: '', points: 0, clickPower: 1 });

  const handleLogin = (username: string, points: number, clickPower: number) => {
    setIsLoggedIn(true);
    setUserData({ username, points, clickPower });
  };

  return (
    <>
      {isLoggedIn ? (
        <Games userData={userData} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
