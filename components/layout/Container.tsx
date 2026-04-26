type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: Props) {
  return (
    <div className={["mx-auto w-full max-w-6xl px-4", className].filter(Boolean).join(" ")}>{children}</div>
  );
}
