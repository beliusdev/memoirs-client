import { useState } from 'react';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';

import MemoryApi from '../../api/MemoryApi';
import { setMessage, setMemories } from '../../state';
import getErrorMessage from '../../utils/getErrorMessage';

import Form from '../Form/Form';
import Button from '../Button/Button';

function Memory({ memory }) {
  const dispatch = useDispatch();
  const memories = useSelector((state) => state.memories);
  const [isEditing, setIsEditing] = useState(false);
  const { _id, title, body, tags, createdAt } = memory;

  const [memoryData, setMemoryData] = useState({
    title,
    body,
    tags: tags.join(', '),
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await MemoryApi.editMemory(_id, {
        ...memoryData,
        tags: memoryData.tags
          .replace(', ', ',')
          .split(',')
          .map((tag) => tag.trim().toLowerCase()),
      });

      const updatedMemories = memories.filter((memory) => memory._id !== _id);
      dispatch(setMemories([...updatedMemories, response.data.memory]));
      setIsEditing(false);
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  const handleDelete = async () => {
    try {
      await MemoryApi.deleteMemory(_id);
      const updatedMemories = memories.filter((memory) => memory._id !== _id);
      dispatch(setMemories(updatedMemories));
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  return (
    <div className='memory'>
      {!isEditing ? (
        <>
          <h3 className='memory__title'>{title}</h3>
          <p className='memory__body'>{body}</p>

          <p className='memory__tags'>{tags.join(', ')}</p>
          <h6 className='memory__date'>
            {moment(createdAt).locale('en-ca').format('LL')}
          </h6>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title'>Title</label>
            <input
              onChange={(e) =>
                setMemoryData({ ...memoryData, title: e.target.value })
              }
              value={memoryData.title}
              id='title'
              type='text'
              placeholder='Title'
              required
            />
          </div>

          <div>
            <label htmlFor='body'>Body</label>
            <textarea
              onChange={(e) =>
                setMemoryData({ ...memoryData, body: e.target.value })
              }
              value={memoryData.body}
              id='body'
              type='text'
              placeholder='Body'
              required
            />
          </div>

          <div>
            <label htmlFor='tags'>Tags</label>
            <input
              onChange={(e) =>
                setMemoryData({
                  ...memoryData,
                  tags: e.target.value,
                })
              }
              value={memoryData.tags}
              id='tags'
              type='text'
              placeholder='Separate tags with comma'
            />
          </div>

          <button type='submit'>Save</button>
        </Form>
      )}
      <div className='memory__actions'>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={`button button--${isEditing ? 'warning' : 'primary'}`}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
        <Button onClick={handleDelete} type='warning'>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Memory;
