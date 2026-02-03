export default function EditProfile() {
  return (
    <form className="popup__form" id="edit-profile-form" noValidate>
      <input
        minLength="2"
        maxLength="40"
        required
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Nombre"
        type="text"
      />
      <span className="popup__error name-error"></span>

      <input
        minLength="2"
        maxLength="200"
        required
        className="popup__input popup__input_type_description"
        name="description"
        placeholder="Acerca de mí"
        type="text"
      />
      <span className="popup__error description-error"></span>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
