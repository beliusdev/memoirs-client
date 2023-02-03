import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Form from '../../components/Form/Form';
import Container from '../../components/Container/Container';

import { setMemories, setMessage, setSearchTerm } from '../../state';
import MemoryApi from '../../api/MemoryApi';
import getErrorMessage from '../../utils/getErrorMessage';

function CreateMemory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memories = useSelector((state) => state.memories);
  const [memoryData, setMemoryData] = useState({
    title: '',
    body: '',
    tags: '',
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(setSearchTerm(''));
      const response = await MemoryApi.createMemory({
        ...memoryData,
        tags: memoryData.tags
          .replace(', ', ',')
          .split(',')
          .map((tag) => tag.trim().toLowerCase()),
      });
      dispatch(setMemories([...memories, response.data.memory]));
      navigate('/');
    } catch (error) {
      dispatch(setMessage(getErrorMessage(error)));
    }
  };

  return (
    <div className='create-memory'>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title'>Title</label>
            <input
              onChange={(e) =>
                setMemoryData({ ...memoryData, title: e.target.value })
              }
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
              id='tags'
              type='text'
              placeholder='Separate tags with comma'
            />
          </div>

          <button type='submit'>Create</button>
        </Form>
      </Container>
    </div>
  );
}

export default CreateMemory;
