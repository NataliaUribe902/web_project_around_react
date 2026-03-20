import { useContext, useEffect, useState } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/NewCard/NewCard";
import EditProfile from "./components/EditProfile/EditProfile";
import EditAvatar from "./components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";
import api from "../../utils/api";
import { CurrentUserContext } from "../../context/CurrentUserContext";
function Main() {
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [popup, setPopup] = useState(null);

  function handleCardLike(card) {
    const isLiked = card.isLiked;

    if (isLiked) {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard,
            ),
          );
        })
        .catch((error) => console.error(error));
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard,
            ),
          );
        })
        .catch((error) => console.error(error));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
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
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt="Avatar"
          />
          <button
            className="profile__avatar-edit"
            type="button"
            aria-label="Editar avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">{currentUser?.about}</p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleOpenImagePopup}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
