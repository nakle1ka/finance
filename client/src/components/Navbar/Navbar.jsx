import { NavLink } from "react-router-dom";

import "./Navbar.css"

import homeIcon from "./img/Home.png"
import settingsIcon from "./img/Slider.png"
import profileIcon from "./img/Customer.png"

const normalLink = "nav__list-item"
const activeLink = "nav__list-item nav__list-item_active"

const Navbar = () => {

    return (
        <nav className="nav">
            <p className="nav__title">
                Menu
            </p>

            <div className="nav__menuList">
                <ul>
                    <li id="profile" className="profile">
                        <NavLink to="/profile" className={({ isActive }) => isActive ? activeLink : normalLink}>
                            <img src={profileIcon} alt="" />
                            <p className="nav__p">Profile</p>
                        </NavLink>
                    </li>
                    <li id="home" className="home">
                        <NavLink to="/Home" className={({ isActive }) => isActive ? activeLink : normalLink}>
                            <img src={homeIcon} alt="" />
                            <p className="nav__p">Home</p>
                        </NavLink>
                    </li>
                    <li id="settings" className="settings">
                        <NavLink to="/Settings" className={({ isActive }) => isActive ? activeLink : normalLink}>
                            <img src={settingsIcon} alt="" />
                            <p className="nav__p">Settings</p>
                        </NavLink>
                    </li>
                </ul>
            </div>

        </nav>
    );
}

export default Navbar;