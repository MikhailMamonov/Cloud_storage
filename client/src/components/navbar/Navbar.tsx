import React, { FC, useState } from 'react';
import './navbar.scss';
import logo from 'assets/navbar-logo.svg';
import avatarLogo from 'assets/avatar.svg';
import { NavLink } from 'react-router-dom';
import { logout } from 'store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'hooks/useSelector';
import { getFiles, searchFiles } from 'store/actions/files';
import { GetFilesProps } from 'store/types/files';
import { showLoader } from 'store/features/app/appSlice';
import { API_URL } from 'config';
const Navbar: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { currentDir } = useAppSelector((state) => state.file);
  const currentUser = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState('');
  const avatar = currentUser?.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;
  const [searchTimeOut, setSearchTimeOut] = useState<
    NodeJS.Timeout | string | number | undefined
  >(undefined);
  function searchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value);
    if (searchTimeOut) {
      clearTimeout(searchTimeOut);
    }
    if (e.target.value !== '') {
      dispatch(showLoader());
      setSearchTimeOut(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles({ dirId: currentDir } as GetFilesProps));
    }
  }

  return (
    <div className="navbar">
      <div className="container">
        <img src={logo} className="navbar__logo" alt="" />
        <div className="navbar__header">MERN CLOUD</div>
        {isAuth && (
          <input
            className="navbar__search"
            type="text"
            onChange={(e) => {
              searchChangeHandler(e);
            }}
            value={searchName}
            placeholder="Название файла..."
          />
        )}
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
        {isAuth && (
          <NavLink to="/profile">
            <img className="navbar__avatar" src={avatar} alt="" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
