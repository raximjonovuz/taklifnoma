export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="block h-px w-12 bg-gradient-to-r from-transparent to-gold-300" />
      <svg
        viewBox="0 0 40 12"
        className="h-3 w-10 text-gold-300"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 6 Q 10 0, 20 6 T 38 6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="20" cy="6" r="1.5" fill="currentColor" />
      </svg>
      <span className="block h-px w-12 bg-gradient-to-l from-transparent to-gold-300" />
    </div>
  );
}
