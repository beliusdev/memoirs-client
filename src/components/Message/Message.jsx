import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMessage } from '../../state';

import Container from '../Container/Container';

function Message() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);

  console.log(message);

  useEffect(() => {
    if (!message) return;
    const timerId = setTimeout(() => {
      dispatch(setMessage(''));
    }, 6000);

    return () => {
      clearTimeout(timerId);
    };
  }, [message, dispatch]);

  return (
    message && (
      <div className='message'>
        <Container>
          {message instanceof Array ? (
            message.map((msg) => (
              <p key={msg} className='message__item'>
                {msg}
              </p>
            ))
          ) : (
            <p className='message__item'>{message}</p>
          )}
        </Container>
      </div>
    )
  );
}

export default Message;
