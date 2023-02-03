import './styles/main.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import UserApi from './api/UserApi';
import MemoryApi from './api/MemoryApi';
import { setMessage, setUser, setMemories } from './state';
import getErrorMessage from './utils/getErrorMessage';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserPage from './pages/UserPage/UserPage';
import CreateMemory from './pages/CreateMemory/CreateMemory';

import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import RouteController from './components/RouteController/RouteController';
import Message from './components/Message/Message';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('mm-token');
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const response = await UserApi.getUser();
        const responseMemories = await MemoryApi.getUserMemories();
        dispatch(setMemories(responseMemories.data.memories));
        dispatch(setUser(response.data.user));
      } catch (error) {
        localStorage.removeItem('mm-token');
        dispatch(setMessage(getErrorMessage(error)));
        dispatch(setUser({}));
      }
    })();
  }, [dispatch, token]);

  useEffect(() => {
    if (localStorage.getItem('mm-token') && !user.username) setIsLoading(true);
    else setIsLoading(false);
  }, [user]);

  return (
    <div className='main'>
      {!isLoading ? (
        <Router>
          <Header />
          <Message />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/profile'
              element={
                <RouteController>
                  <UserPage />
                </RouteController>
              }
            />
            <Route
              path='/create'
              element={
                <RouteController>
                  <CreateMemory />
                </RouteController>
              }
            />
          </Routes>
        </Router>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
