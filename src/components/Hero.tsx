import { useEffect, useRef } from "react";
import { BG_IMAGE_1, FRONT_VIDEO, OVERLAY_IMAGE } from "../constants";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);

  const targetPos = useRef({ x: -9999, y: -9999 });
  const smoothPos = useRef({ x: -9999, y: -9999 });
  const gridOffset = useRef({ x: 0, y: 0 });
  const gridTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const RADIUS = 260;
    let raf = 0;
    let running = true;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetPos.current = { x, y };

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      gridTarget.current = {
        x: ((x - cx) / cx) * 16,
        y: ((y - cy) / cy) * 16,
      };
    };

    const onLeave = () => {
      targetPos.current = { x: -9999, y: -9999 };
      gridTarget.current = { x: 0, y: 0 };
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    const tick = () => {
      if (!running) return;

      // Lerp cursor for mask (factor 0.1)
      smoothPos.current.x += (targetPos.current.x - smoothPos.current.x) * 0.1;
      smoothPos.current.y += (targetPos.current.y - smoothPos.current.y) * 0.1;

      // Lerp grid parallax (factor 0.06)
      gridOffset.current.x +=
        (gridTarget.current.x - gridOffset.current.x) * 0.06;
      gridOffset.current.y +=
        (gridTarget.current.y - gridOffset.current.y) * 0.06;

      if (gridRef.current) {
        gridRef.current.style.transform = `translate(${gridOffset.current.x}px, ${gridOffset.current.y}px)`;
      }

      const sx = smoothPos.current.x;
      const sy = smoothPos.current.y;

      if (maskRef.current) {
        if (sx > -500 && sy > -500) {
          const mask = `radial-gradient(circle ${RADIUS}px at ${sx}px ${sy}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%)`;
          maskRef.current.style.webkitMaskImage = mask;
          maskRef.current.style.maskImage = mask;
          maskRef.current.style.webkitMaskRepeat = "no-repeat";
          maskRef.current.style.maskRepeat = "no-repeat";
          maskRef.current.style.opacity = "1";
        } else {
          maskRef.current.style.opacity = "0";
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#080808]"
    >
      {/* Layer 1 — Grid Background */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-[-32px] z-0 opacity-10 will-change-transform"
        aria-hidden
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="lab-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lab-grid)" />
        </svg>
      </div>

      {/* Layer 2 — Background Image */}
      <div
        className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      {/* Dark vignette for readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-b from-black/40 via-transparent to-black/70"
        aria-hidden
      />

      {/* Layer 3 — Hero Text */}
      <div className="font-helvetica-neue pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-0 right-0 top-20 text-center sm:top-28 md:top-32">
          <h1 className="font-instrument text-[4.5rem] leading-[0.85] tracking-tight text-white xs:text-[5.5rem] sm:text-[7rem] md:text-[10rem] lg:text-[14rem]">
            PRATHAM
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-4 sm:mt-8 sm:gap-3">
            <span className="liquid-glass rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/80 sm:text-xs">
              DAV — Science — Class 12
            </span>
            <span className="liquid-glass rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/80 sm:text-xs">
              AI • BLOCKCHAIN • QUANTUM
            </span>
            <span className="liquid-glass rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/80 sm:text-xs">
              17YO RESEARCHER BUILDING THE FUTURE
            </span>
          </div>
        </div>

        {/* Bottom left micro-bio */}
        <p className="absolute bottom-10 left-6 z-30 max-w-[300px] text-[11px] uppercase leading-relaxed tracking-[0.2em] text-white/60 md:left-10">
          Pratham Agrawal is a 17-year-old from DAV School. Passionate about AI,
          trying out new things, blockchain, quantum computing. Loves to do
          research, break things, and rebuild them smarter.
        </p>
      </div>

      {/* Layer 4 — Overlay Image */}
      <img
        src={OVERLAY_IMAGE}
        alt=""
        className="pointer-events-none absolute inset-0 z-[25] h-full w-full object-cover"
        draggable={false}
      />

      {/* Layer 5 — Spotlight Reveal (video) */}
      <div
        ref={maskRef}
        className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300"
      >
        <div
          className="absolute inset-0"
          style={{ clipPath: "inset(40% 0 0 0)" }}
        >
          <video
            src={FRONT_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-16 left-0 right-0 text-center">
            <span className="mono-label text-white/90">
              TRY • LEARN • BUILD • RESEARCH
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 h-24 bg-gradient-to-t from-[#080808] to-transparent"
        aria-hidden
      />
    </section>
  );
}
