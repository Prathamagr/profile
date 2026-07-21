import {
  useRef,
  type ReactNode,
  type MouseEvent,
  type CSSProperties,
} from "react";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  strength = 0.4,
  className = "",
  as = "button",
  href,
  onClick,
  type = "button",
  style,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  const sharedClass = `inline-flex items-center justify-center transition-transform duration-300 ease-out will-change-transform ${className}`;

  if (as === "a" && href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={sharedClass}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={sharedClass}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
