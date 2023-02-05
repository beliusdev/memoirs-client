import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import UserApi from '../../api/UserApi';
import { setMessage, setUser } from '../../state';
import getErrorMessage from '../../utils/getErrorMessage';

import Form from '../../components/Form/Form';
import Container from '../../components/Container/Container';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const isAuth = Boolean(useSelector((state) => state.user.username));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await UserApi.register(userInfo);
      localStorage.setItem('mm-token', response.data.token);
      dispatch(setUser(response.data.user));
      navigate('/');
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  return isAuth ? (
    <Navigate to='/' />
  ) : (
    <div className='register'>
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
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              id='password'
              type='password'
              placeholder='Password'
              required
            />
          </div>

          <div>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              onChange={(e) =>
                setUserInfo({ ...userInfo, confirmPassword: e.target.value })
              }
              id='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              required
            />
          </div>
          {userInfo.password !== userInfo.confirmPassword ? (
            <h4>Passwords don't match.</h4>
          ) : null}
          <button type='submit'>Register</button>
          <p>
            Already have an account? <Link to='/login'>Log In</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
