import React, { FC } from 'react';
import './navbar.scss';
import logo from '../../assets/navbar-logo.svg';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
const Navbar: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
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
        {isAuth && (
          <div className="navbar__login" onClick={() => dispatch(logout())}>
            Выход
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
