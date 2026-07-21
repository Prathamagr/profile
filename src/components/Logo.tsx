import { LOGO_PATH } from "../constants";

interface LogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function Logo({ size = 28, className = "", onClick }: LogoProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-opacity hover:opacity-80 ${className}`}
      aria-label="Pratham Agrawal"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 256 256"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={LOGO_PATH} />
      </svg>
    </button>
  );
}
