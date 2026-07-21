import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";

const PILLARS = [
  {
    id: "ai",
    title: "AI",
    desc: "Training, prompting, building with AI. Trying out new things every week.",
    accent: "from-emerald-400/20 to-transparent",
    tag: "01",
  },
  {
    id: "blockchain",
    title: "BLOCKCHAIN",
    desc: "Decentralization, protocols, trustless systems. Exploring what comes next.",
    accent: "from-sky-400/20 to-transparent",
    tag: "02",
  },
  {
    id: "quantum",
    title: "QUANTUM COMPUTING",
    desc: "Qubits, superposition, future compute. Researching what's beyond classical.",
    accent: "from-violet-400/20 to-transparent",
    tag: "03",
  },
];

function TiltCard({
  pillar,
  delay,
}: {
  pillar: (typeof PILLARS)[number];
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useReveal<HTMLDivElement>();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;

    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) scale3d(1.02,1.02,1.02)`;
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={revealRef}
      className="reveal h-full"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="card-spotlight liquid-glass group relative h-full rounded-3xl p-7 transition-transform duration-300 ease-out will-change-transform md:p-8"
      >
        <div
          className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        <div className="relative z-[2]">
          <div className="mb-10 flex items-start justify-between">
            <span className="mono-label text-white/30">{pillar.tag}</span>
            <span className="h-2 w-2 rounded-full bg-green-400/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <h3 className="font-instrument text-3xl leading-tight text-white md:text-4xl">
            {pillar.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
            {pillar.desc}
          </p>

          <div className="mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/35 transition-colors group-hover:text-white/60">
            <span>Explore</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Research() {
  const headerRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="research"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="research-grid"
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
          <rect width="100%" height="100%" fill="url(#research-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div ref={headerRef} className="reveal mb-14 md:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-green-400/80">
            02 — Focus
          </p>
          <h2 className="font-instrument text-5xl leading-none text-white sm:text-6xl md:text-7xl">
            Research Pillars
          </h2>
          <p className="mt-4 max-w-xl text-sm text-white/45 md:text-base">
            Three frontiers I keep returning to — where curiosity compounds into
            real experiments.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {PILLARS.map((pillar, i) => (
            <TiltCard key={pillar.id} pillar={pillar} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
