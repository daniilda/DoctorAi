import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: "default";
}

export const Button: React.FC<ButtonProps> = ({ className, ...rest }) => {
  return (
    <button
      className={`bg-primary hover:bg-primaryLighter shadow-sm duration-200 hover:shadow-md transition-all text-text-onPrimary text-xl font-medium rounded-xl py-3 ${className}`}
      {...rest}
    />
  );
};
