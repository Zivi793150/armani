type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: Props) {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
