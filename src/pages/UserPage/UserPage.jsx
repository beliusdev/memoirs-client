import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';

import UserApi from '../../api/UserApi';
import { setMemories, setMessage, setUser } from '../../state';
import getErrorMessage from '../../utils/getErrorMessage';

import Form from '../../components/Form/Form';
import Container from '../../components/Container/Container';

function UserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState('');
  const { username, createdAt } = useSelector((state) => state.user);

  const [newUsername, setNewUsername] = useState(username);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleDelete = async () => {
    try {
      const userResponse = window.prompt(
        'Do you want to delete your account?\nYour memories will be deleted.\n\nPassword:'
      );
      if (!userResponse) return;

      await UserApi.deleteUser(userResponse);
      localStorage.removeItem('mm-token');
      dispatch(setUser({}));
      dispatch(setMemories([]));
      navigate('/');
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await UserApi.editUser({ username: newUsername });
      dispatch(setUser(response.data.user));
      setIsEditing(false);
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  const changePassword = async (e) => {
    try {
      e.preventDefault();
      await UserApi.changePassword({ password, newPassword });
      setIsEditing('');
      navigate('/profile');
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  return (
    <div className='user-page'>
      {!isEditing ? (
        <Container>
          <h1 className='user-page__username'>{username}</h1>
          <h6 className='memory__date'>
            {moment(createdAt).locale('en-ca').format('LL')}
          </h6>
          <div className='user-page__actions'>
            <Button onClick={() => setIsEditing('edit')}>Edit</Button>
            <Button onClick={() => setIsEditing('password')}>
              Change password
            </Button>
            <Button onClick={handleDelete} type='warning'>
              Delete Account
            </Button>
          </div>
        </Container>
      ) : (
        <Container>
          {isEditing === 'password' ? (
            <Form onSubmit={changePassword}>
              <div>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor='newPassword'>New password</label>
                <input
                  id='newPassword'
                  type='password'
                  placeholder='New password'
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor='confirmPassword'>Confirm password</label>
                <input
                  id='confirmPassword'
                  type='password'
                  placeholder='Confirm password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {newPassword !== confirmPassword && (
                <h4>Passwords don't match.</h4>
              )}
              <button type='submit'>Change password</button>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='username'>Username</label>
                <input
                  id='username'
                  type='text'
                  placeholder='Username'
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>

              <button type='submit'>Save</button>
            </Form>
          )}
          <Button onClick={() => setIsEditing('')}>Cancel</Button>
        </Container>
      )}
    </div>
  );
}

export default UserPage;
