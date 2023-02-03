import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import variables from '../../styles/variables.scss';

import { setUser, setMemories } from '../../state';

/* eslint-disable jsx-a11y/anchor-is-valid */
function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const user = useSelector((state) => state.user);
  const bpLargest = Number(variables.bpLargest.replace('px', ''));

  window.onresize = () => setScreenWidth(window.innerWidth);

  const navigationItems = user.username
    ? {
        home: '/',
        profile: '/profile',
        'create memory': '/create',
      }
    : {
        home: '/',
        login: '/login',
        register: '/register',
      };

  const handleLogout = () => {
    localStorage.removeItem('mm-token');
    dispatch(setUser({}));
    dispatch(setMemories([]));
    navigate('/');
  };

  const logout = (
    <a
      className='navigation__item'
      onClick={() => {
        handleLogout();
        setIsMenuOpened(false);
      }}
    >
      Log Out
    </a>
  );

  const items = Object.entries(navigationItems).map(([key, value]) => (
    <NavLink
      key={key}
      activeclassname='active'
      className='navigation__item'
      onClick={() => setIsMenuOpened(false)}
      to={value}
    >
      {key}
    </NavLink>
  ));

  return (
    <ul className='navigation'>
      {screenWidth < bpLargest ? (
        <>
          <div
            className={`navigation__icon ${
              isMenuOpened ? 'navigation__icon--opened' : ''
            }`}
            onClick={() => setIsMenuOpened(!isMenuOpened)}
          >
            <div></div>
          </div>
          {isMenuOpened && items}
        </>
      ) : (
        <>
          {items}
          {user.username && logout}
        </>
      )}
    </ul>
  );
}

export default Navigation;
