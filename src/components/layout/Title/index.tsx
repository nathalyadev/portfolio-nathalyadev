export function Title({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mt-4 font-dm-serif-display text-3xl leading-tight text-black sm:text-3xl"
    >
      {children}
    </h2>
  );
}
