import React from "react";
import logoPath from "../images/logo/Vector.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="логотип место" />
    </header>
  );
}

export default Header;
