import { useReveal } from "../hooks/useReveal";
import { MagneticButton } from "./MagneticButton";

const STACK = [
  "Python",
  "AI/ML",
  "Web",
  "Quantum Basics",
  "Blockchain",
  "Research",
  "TypeScript",
  "Systems Thinking",
];

export function StackContact() {
  const stackRef = useReveal<HTMLDivElement>();
  const contactRef = useReveal<HTMLDivElement>();
  const footerRef = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-6 pb-16 pt-28 md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="stack-grid"
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
          <rect width="100%" height="100%" fill="url(#stack-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Stack */}
        <div id="stack" ref={stackRef} className="reveal mb-28 scroll-mt-28">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-green-400/80">
            04 — Toolkit
          </p>
          <h2 className="font-instrument mb-8 text-5xl leading-none text-white sm:text-6xl md:text-7xl">
            Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {STACK.map((item) => (
              <span
                key={item}
                className="liquid-glass rounded-full px-5 py-2.5 text-sm font-medium text-white/80 transition-all duration-300 hover:scale-105 hover:text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div
          id="contact"
          ref={contactRef}
          className="reveal scroll-mt-28"
          style={{ transitionDelay: "100ms" }}
        >
          <div className="liquid-glass relative overflow-hidden rounded-[2rem] px-8 py-14 text-center md:px-16 md:py-20">
            {/* Decorative rings */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/5"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-white/5"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.03]"
              aria-hidden
            />

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-green-400/80">
              05 — Contact
            </p>
            <h2 className="font-instrument mx-auto max-w-3xl text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Let&apos;s build something weirdly cool together
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm text-white/45 md:text-base">
              Got a wild idea, research collab, or just want to talk AI at 2AM?
              I&apos;m in.
            </p>

            <div className="mt-10 flex justify-center">
              <MagneticButton
                as="a"
                href="mailto:pratham@example.com"
                strength={0.3}
                className="liquid-glass gap-3 rounded-full px-7 py-3.5 text-sm font-medium text-white"
              >
                <span className="pulse-dot h-2 w-2 rounded-full bg-green-400" />
                <span>Say hello</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="reveal mt-16 border-t border-white/5 pt-8"
          style={{ transitionDelay: "160ms" }}
        >
          <p className="text-center text-[11px] leading-relaxed tracking-wide text-white/30">
            Curious sibling: Anant Agrawal — my brother, my first co-founder in
            ideas. © Pratham Agrawal 2026
          </p>
        </div>
      </div>
    </section>
  );
}
