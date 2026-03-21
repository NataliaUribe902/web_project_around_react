import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { useState, useEffect } from "react";
import api from "./utils/api";
import ImagePopup from "./components/Main/components/ImagePopup/ImagePopup";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(null);
  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateUser = (data) => {
    api.updateUserInfo(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }
  function handleOpenImagePopup(card) {
    setPopup({
      title: null,
      children: <ImagePopup card={card} />,
    });
  }
  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
        <Header></Header>
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          onCardClick={handleOpenImagePopup}
          popup={popup}
        ></Main>
        <Footer></Footer>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
