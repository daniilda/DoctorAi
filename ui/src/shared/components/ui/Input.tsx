interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  appearance?: "primary" | "accent";
  onChange?: (text: string) => void;
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({
  appearance: color = "accent",
  onChange,
  className,
  error,
  ...rest
}) => {
  return (
    <input
      className={`shadow-none focus:shadow-md transition-shadow duration-200 outline-none px-4 py-4 rounded-xl placeholder:text-text-placeholder text-base
      ${color === "primary" ? "bg-bg-primary" : "bg-bg-accent"}
      ${error ? "outline-error" : ""} ${className}`}
      onChange={(e) => onChange && onChange(e.target.value)}
      {...rest}
    />
  );
};
