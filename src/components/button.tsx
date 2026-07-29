import { forwardRef } from "react";
import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium " +
  "transition-colors duration-150 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 " +
  "dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-950 " +
  "disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary:
    "bg-neutral-900 text-neutral-50 hover:bg-neutral-700 " +
    "dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300",
  secondary:
    "border border-neutral-200 bg-transparent text-neutral-900 hover:bg-neutral-100 " +
    "dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900",
  ghost:
    "text-neutral-600 hover:text-neutral-900 " +
    "dark:text-neutral-400 dark:hover:text-neutral-100",
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
