import { useReveal } from "../hooks/useReveal";

const EXPERIMENTS = [
  {
    title: "AI Research Logs",
    detail: "Nightly notes on models, prompts, failure modes, and breakthroughs.",
    status: "Active",
  },
  {
    title: "Quantum Notes",
    detail: "Mapping qubits, gates, and the weird beauty of superposition.",
    status: "Active",
  },
  {
    title: "Blockchain Prototypes",
    detail: "Small trustless systems — wallets, contracts, weird protocols.",
    status: "Building",
  },
  {
    title: "Crazy Builds",
    detail: "Unhinged side projects that shouldn't work but somehow do.",
    status: "Ongoing",
  },
];

export function Lab() {
  const headerRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="lab"
      className="relative overflow-hidden bg-[#080808] px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="lab-section-grid"
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
          <rect width="100%" height="100%" fill="url(#lab-section-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div ref={headerRef} className="reveal mb-14 md:mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-green-400/80">
            03 — Lab
          </p>
          <h2 className="font-instrument text-5xl leading-none text-white sm:text-6xl md:text-7xl">
            Currently Experimenting
          </h2>
        </div>

        <div className="relative pl-8 md:pl-12">
          {/* Timeline line */}
          <div
            className="timeline-line absolute bottom-4 left-[11px] top-2 w-px md:left-[15px]"
            aria-hidden
          />

          <div className="space-y-5">
            {EXPERIMENTS.map((item, i) => (
              <LabItem key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LabItem({
  item,
  index,
}: {
  item: (typeof EXPERIMENTS)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal relative"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Green dot on timeline */}
      <div
        className="absolute -left-8 top-7 z-10 md:-left-12"
        aria-hidden
      >
        <div className="relative flex h-6 w-6 items-center justify-center md:h-8 md:w-8">
          <span className="pulse-dot absolute h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="absolute h-5 w-5 rounded-full border border-green-400/30 md:h-6 md:w-6" />
        </div>
      </div>

      <div className="liquid-glass group rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.09] md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <span className="mono-label text-white/25">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-green-400/20 bg-green-400/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-green-400/90">
                {item.status}
              </span>
            </div>
            <h3 className="font-instrument text-2xl text-white md:text-3xl">
              {item.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">
              {item.detail}
            </p>
          </div>

          {/* CSS-only decorative shape */}
          <div
            className="relative mt-1 h-12 w-12 shrink-0 opacity-40 transition-opacity group-hover:opacity-70"
            aria-hidden
          >
            <div className="absolute inset-0 rotate-45 rounded-lg border border-white/20" />
            <div className="absolute inset-2 rounded-full border border-dashed border-white/15" />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
