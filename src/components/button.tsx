import { forwardRef } from "react";
import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 font-mono font-medium " +
  "border transition-all duration-150 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background " +
  "disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  // amber outline that fills on hover — the mockup's .btn
  primary:
    "border-accent text-accent bg-transparent " +
    "hover:bg-accent hover:text-background hover:[box-shadow:var(--glow-accent)]",

  secondary:
    "border-border bg-secondary-background text-text-primary " +
    "hover:border-secondary-border hover:bg-secondary-background-hover",

  ghost: "border-transparent text-text-secondary hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type Props = ButtonProps | LinkProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  (
    {
      variant = "secondary",
      size = "md",
      icon,
      fullWidth,
      className = "",
      children,
      ...rest
    },
    ref,
  ) => {
    const cn = [
      base,
      variants[variant],
      sizes[size],
      fullWidth ? "w-full" : "w-full md:w-auto",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {children}
        {icon && (
          <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>
        )}
      </>
    );

    if ("href" in rest && rest.href) {
      const { href, target, ...anchorRest } = rest as LinkProps;
      const external = href.startsWith("http");
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target ?? (external ? "_blank" : undefined)}
          rel={external ? "noopener noreferrer" : undefined}
          className={cn}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn}
        {...(rest as ButtonProps)}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
