import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { useState, useEffect } from "react";
import api from "./utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
