import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import UserApi from '../../api/UserApi';
import MemoryApi from '../../api/MemoryApi';
import { setMemories, setMessage, setUser } from '../../state';

import Form from '../../components/Form/Form';
import Container from '../../components/Container/Container';
import getErrorMessage from '../../utils/getErrorMessage';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const isAuth = Boolean(useSelector((state) => state.user.username));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await UserApi.login(userInfo);
      localStorage.setItem('mm-token', response.data.token);

      const responseMemories = await MemoryApi.getUserMemories();

      dispatch(setMemories(responseMemories.data.memories));
      dispatch(setUser(response.data.user));

      navigate('/');
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  return isAuth ? (
    <Navigate to='/' />
  ) : (
    <div className='login'>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              onChange={(e) =>
                setUserInfo({ ...userInfo, username: e.target.value })
              }
              id='username'
              type='text'
              placeholder='Username'
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
              id='password'
              type='password'
              placeholder='Password'
              required
            />
          </div>

          <button type='submit'>Log In</button>
          <p>
            Do not have an account? <Link to='/register'>Register</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
