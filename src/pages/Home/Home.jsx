import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import introImage from '../../assets/intro-page.jpg';

import Memory from '../../components/Memory/Memory';
import Button from '../../components/Button/Button.jsx';
import Container from '../../components/Container/Container';

function Home() {
  const user = useSelector((state) => state.user);
  const memories = useSelector((state) => state.memories);

  return !user.username ? (
    <div className='home'>
      <Container>
        <div className='home__info'>
          <p className='home__text--short'>
            Preserve Your Precious Memories with Memoirs
          </p>
          <h3 className='home__text--long'>
            Memoirs is a web-based platform that allows you to cherish your
            precious moments and relive them anytime. It's an easy-to-use
            application that provides a seamless experience in creating,
            storing, and searching for your memories. With Memoirs, you can
            securely document your life events and recall them in a snap. Start
            preserving your life's most valuable moments today with Memoirs.
          </h3>
          <Link to='/login'>
            <Button>Join &rarr;</Button>
          </Link>
        </div>
        <img className='home__image' src={introImage} alt='Memories' />
      </Container>
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
