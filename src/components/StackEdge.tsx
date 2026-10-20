// Layered "sheet" edges above a section — echoes the stacked-surface transition on the reference.
export default function StackEdge({ className = "bg-deep" }: { className?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-full flex flex-col items-center">
      <div className={`h-2 w-[78%] rounded-t-full opacity-30 ${className}`} />
      <div className={`h-2 w-[86%] rounded-t-full opacity-55 ${className}`} />
      <div className={`h-2 w-[94%] rounded-t-full opacity-80 ${className}`} />
    </div>
  );
}
