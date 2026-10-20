// Decorative pattern derived from the triangle "flag" mark in the Raya IT logo.
export default function FlagMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 148 148"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M0 35 68 0v70Z" />
      <path d="M148 35 80 0v70Z" />
      <path d="M0 113 68 78v70Z" />
      <path d="M148 113 80 78v70Z" />
    </svg>
  );
}
