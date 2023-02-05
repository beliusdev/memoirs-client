import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className='logo'>
      <Link to='/'>
        <h1>Memoirs</h1>
      </Link>
    </div>
  );
}

export default Logo;
