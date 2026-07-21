import { useEffect } from "react";
import { Logo } from "./Logo";
import { MagneticButton } from "./MagneticButton";
import { NAV_ITEMS } from "../constants";

interface NavigationProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export function Navigation({ menuOpen, setMenuOpen }: NavigationProps) {
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollTop = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-8">
        <Logo size={28} onClick={scrollTop} />

        {/* Desktop center pill nav */}
        <div className="liquid-glass absolute left-1/2 top-5 hidden -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <MagneticButton
              key={item.id}
              strength={0.35}
              onClick={() => scrollTo(item.id)}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-white/70 hover:text-white"
            >
              {item.label}
            </MagneticButton>
          ))}
        </div>

        {/* Desktop CTA */}
        <MagneticButton
          strength={0.3}
          className="liquid-glass hidden items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium text-white md:inline-flex"
          onClick={() => scrollTo("about")}
        >
          <span className="pulse-dot h-2 w-2 rounded-full bg-green-400" />
          <span>17 // DAV // BUILDING</span>
        </MagneticButton>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full md:hidden"
        >
          <span className="flex flex-col items-end gap-1.5">
            <span className="h-[1.5px] w-5 bg-white" />
            <span className="h-[1.5px] w-3.5 bg-white" />
          </span>
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[55] flex flex-col bg-[#0a0a0a]"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-5 py-5">
            <Logo size={28} onClick={scrollTop} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="liquid-glass menu-close-enter relative flex h-11 w-11 items-center justify-center rounded-full"
            >
              <span className="absolute h-[1.5px] w-4 rotate-45 bg-white" />
              <span className="absolute h-[1.5px] w-4 -rotate-45 bg-white" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="menu-item-enter text-3xl font-medium text-white/90 sm:text-4xl"
                style={{ animationDelay: `${100 + i * 60}ms` }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex justify-center pb-10">
            <div
              className="liquid-glass menu-item-enter inline-flex items-center gap-2.5 rounded-full px-5 py-3"
              style={{
                animationDelay: `${100 + NAV_ITEMS.length * 60}ms`,
              }}
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-white">
                Pratham Agrawal — 17, Researcher
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
