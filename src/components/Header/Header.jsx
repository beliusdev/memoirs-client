import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MemoryApi from '../../api/MemoryApi';
import { setMemories, setMessage, setSearchTerm } from '../../state';
import getErrorMessage from '../../utils/getErrorMessage';

import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const searchTerm = useSelector((state) => state.searchTerm);

  useEffect(() => {
    if (!localStorage.getItem('mm-token')) return;
    const timerId = setTimeout(() => {
      (async () => {
        try {
          const response = await MemoryApi.searchMemories(searchTerm);
          dispatch(setMemories(response.data.memories));
        } catch (error) {
          dispatch(setMessage(getErrorMessage(error)));
        }
      })();
    }, 1500);

    return () => clearTimeout(timerId);
  }, [searchTerm, dispatch]);

  return (
    <div className='header'>
      <Container>
        <Logo />
        {user.username && (
          <input
            value={'' || searchTerm}
            className='header__search'
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder='Remember...'
          />
        )}
        <Navigation />
      </Container>
    </div>
  );
}

export default Header;
