import { useReveal } from "../hooks/useReveal";

export function About() {
  const titleRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#080808] px-6 py-28 md:px-12 lg:px-20"
    >
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="about-grid"
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
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.4fr] md:gap-16">
        <div ref={titleRef} className="reveal md:sticky md:top-32 md:self-start">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-green-400/80">
            01 — Now
          </p>
          <h2 className="font-instrument text-6xl leading-none text-white sm:text-7xl md:text-8xl">
            ABOUT
          </h2>
        </div>

        <div ref={contentRef} className="reveal space-y-6" style={{ transitionDelay: "120ms" }}>
          <div className="liquid-glass rounded-3xl p-7 md:p-9">
            <p className="text-lg leading-relaxed text-white/80 md:text-xl">
              I&apos;m Pratham Agrawal, 17, studying Science at DAV. I don&apos;t
              just study tech — I live in it. AI models at 2AM, blockchain
              whitepapers at breakfast, quantum papers for fun.
            </p>
          </div>

          <div className="liquid-glass rounded-3xl p-7 md:p-9">
            <p className="mb-6 text-sm leading-relaxed text-white/55">
              Every day is an experiment. I break things to understand them,
              rebuild them smarter, and document what I learn along the way.
              Research isn&apos;t a subject for me — it&apos;s how I move through
              the world.
            </p>

            <div className="flex flex-wrap gap-2">
              {["17 YO", "DAV Science", "Builder", "Researcher"].map((stat) => (
                <span
                  key={stat}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70"
                >
                  {stat}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Age", value: "17" },
              { label: "School", value: "DAV" },
              { label: "Stream", value: "Science" },
              { label: "Mode", value: "Build" },
            ].map((item) => (
              <div
                key={item.label}
                className="liquid-glass rounded-2xl px-4 py-5 text-center"
              >
                <div className="font-instrument text-3xl text-white">
                  {item.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
