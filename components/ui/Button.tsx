import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center rounded-xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary:
    "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
  outline: "bg-transparent border-2 border-brand-600 text-brand-600 hover:bg-brand-50"
};

const sizes = {
  md: "px-5 py-3 text-sm",
  lg: "px-8 py-4 text-base"
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  onClick
}: Props) {
  const styles = [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
  
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
