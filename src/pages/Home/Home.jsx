import { useSelector } from 'react-redux';

import Container from '../../components/Container/Container';
import Memory from '../../components/Memory/Memory';

function Home() {
  const user = useSelector((state) => state.user);
  const memories = useSelector((state) => state.memories);

  return !user.username ? (
    <div className='home'>
      <Container>Home</Container>
    </div>
  ) : (
    <div className='memories'>
      <Container>
        {memories.map((memory) => (
          <Memory key={memory._id} memory={memory} />
        ))}
      </Container>
    </div>
  );
}

export default Home;
