import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: "primary" | "secondary" | "main";
  rounded?: "lg" | "xl";
  fontSize?: "lg" | "xl" | "2xl";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  rounded = "lg",
  appearance = "primary",
  fontSize = "xl",
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
      } shadow-sm duration-200 hover:shadow-md active:shadow-sm disabled:bg-bg-disabled transition-all text-${fontSize} font-medium rounded-${rounded} py-3 ${className}`}
      {...rest}
    />
  );
};
