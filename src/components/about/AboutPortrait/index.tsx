export function AboutPortrait() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-[#1f4348] lg:max-w-none">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(247,243,237,0.25), transparent 45%), linear-gradient(160deg, #28545a 0%, #18383c 100%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-x-8 bottom-8 top-16 rounded-t-[8rem] bg-cream/10" aria-hidden />
      <div className="absolute inset-x-16 top-24 aspect-square rounded-full bg-cream/15" aria-hidden />
      <span className="sr-only">Retrato profissional de Nathálya Souza</span>
    </div>
  );
}
