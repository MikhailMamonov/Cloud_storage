import React, { FC } from 'react';
import './navbar.scss';
import logo from '../../assets/navbar-logo.svg';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store';
import { useAppSelector } from '../../hooks/useSelector';
const Navbar: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <div className="navbar">
      <div className="container">
        <img src={logo} className="navbar__logo" alt="" />
        <div className="navbar__header">MERN CLOUD</div>
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to={'/login'}>Войти</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to={'/registration'}>Регистрация</NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
