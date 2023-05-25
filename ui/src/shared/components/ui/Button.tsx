import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  appearance = "primary",
  ...rest
}) => {
  return (
    <button
      className={`${
        appearance === "primary"
          ? "bg-primary hover:bg-primaryLighter text-text-onPrimary"
          : "bg-bg-accent text-text-secondary"
      } shadow-sm duration-200 hover:shadow-md transition-all text-xl font-medium rounded-lg py-3 ${className}`}
      {...rest}
    />
  );
};
