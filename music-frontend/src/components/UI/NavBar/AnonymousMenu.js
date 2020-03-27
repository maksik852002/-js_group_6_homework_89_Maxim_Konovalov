import React from "react";
import { NavLink } from "react-router-dom";

const AnonymousMenu = () => (
  <NavLink className="anonymyos-dropdown" to="/login">
    Войти
  </NavLink>
);

export default AnonymousMenu;