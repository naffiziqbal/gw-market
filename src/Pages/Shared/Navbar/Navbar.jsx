import { useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../../../components/avatar/Avatar";
import Logo from "../../../components/logo/Logo";
import Cart from "../../../components/ui/cart/Cart";
import Notification from "../../../components/ui/notification/Notification";
import Dropdown from "./Dropdown";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`${styles.main__header}`}>
      <div className={`custom__container position-relative `}>
        <div
          className={`d-flex justify-content-between align-items-center
          
          `}
        >
          <div className={`w-100 `}>
            <NavLink to={"/"}>
              <Logo />
            </NavLink>
          </div>

          <nav>
            <ul
              className={`list-unstyled d-flex justify-content-end align-items-center `}
            >
              <li>
                <Cart link={'/checkout'} />
              </li>
              <li>
                <Notification />
              </li>
              <li
                aria-label="avatar dropdown"
                aria-labelledby="avatar dropdown menu"
                aria-describedby="avatar dropdown menu"
                className="position-relative"
              >
                <Avatar dropDownHandler={openHandler} />
              </li>
            </ul>
          </nav>
        </div>
        <Dropdown isOpen={isOpen} handleOpen={openHandler} />
      </div>
    </header>
  );
};

export default Navbar;
