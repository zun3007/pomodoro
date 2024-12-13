import { useSound } from '../../hooks/useSound';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

function Button({
  variant = 'primary',
  children,
  onClick,
  ...props
}: ButtonProps) {
  const { playClick } = useSound();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    onClick?.(e);
  };

  return (
    <button
      className={`button ${variant === 'secondary' ? 'secondary' : ''} ${
        props.className || ''
      }`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
