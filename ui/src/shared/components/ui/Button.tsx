import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: "primary" | "secondary" | "main";
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
          : appearance === "secondary"
          ? "bg-bg-accent text-text-secondary hover:text-text-main"
          : "bg-bg-primary text-text-main"
      } shadow-sm duration-200 hover:shadow-md active:shadow-sm transition-all text-xl font-medium rounded-lg py-3 ${className}`}
      {...rest}
    />
  );
};
