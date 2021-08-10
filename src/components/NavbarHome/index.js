import React from "react";
import "./NavbarHome.scss";
import Search from "./Search";
// import LetterAvatars from "./Avatar";
const NavbarHome = ({handleSearch, children}) => {
  return (
    <nav>
        <div className="navbar-home">
          <div className="logo-navbar">
            <h1>Catatanku</h1>
          </div>
          <div className="links-navbar">
            <Search handleSearch={handleSearch}/>
            {/* <LetterAvatars /> */}
            <div className="profile">
              {children}
            </div>
          </div>
        </div>
    </nav>
  );
};

export default NavbarHome;
