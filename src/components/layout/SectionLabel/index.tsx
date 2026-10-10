export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold tracking-[0.18em] text-petrol-blue uppercase">
      {children}
    </span>
  );
}