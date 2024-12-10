import { FC } from "react";
import Link from "next/link";
import classNames from "classnames";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-yellow-500 text-black hover:bg-yellow-600",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
  };

  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const combinedStyles = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
};


