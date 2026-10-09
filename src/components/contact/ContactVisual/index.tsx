export function ContactVisual() {
  return (
    <div
      className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-3xl bg-petrol-blue p-8 sm:min-h-80 lg:min-h-full lg:rounded-none"
      aria-hidden
    >
      <div className="absolute -top-10 -right-8 size-40 rounded-full bg-[#1f4348]" />
      <div className="absolute -bottom-16 -left-10 size-52 rounded-full bg-[#1f4348]/80" />

      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#2a2a2a] shadow-[0_24px_50px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="aspect-[16/10] space-y-3 bg-cream p-5">
          <div className="h-3 w-1/3 rounded-full bg-petrol-blue/35" />
          <div className="h-2 w-4/5 rounded-full bg-beige" />
          <div className="h-2 w-3/5 rounded-full bg-beige" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="aspect-square rounded-lg bg-secondary" />
            <div className="aspect-square rounded-lg bg-beige" />
            <div className="aspect-square rounded-lg bg-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
