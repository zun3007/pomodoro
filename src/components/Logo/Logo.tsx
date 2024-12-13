import './Logo.css';

function Logo() {
  return (
    <div className='logo'>
      <div className='logo-content'>
        <svg
          className='tomato-icon'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z'
            fill='currentColor'
          />
          <path
            d='M12 2C12 2 14 2 15 3C15 3 14 4 12 4C10 4 9 3 9 3C10 2 12 2 12 2Z'
            fill='currentColor'
          />
        </svg>
        <h1>Pomofocus</h1>
      </div>
    </div>
  );
}

export default Logo;
