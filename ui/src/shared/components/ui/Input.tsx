import ClearSvg from "@/assets/clear.svg";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  appearance?: "primary" | "accent";
  onChange?: (text: string) => void;
  error?: boolean;
  allowClear?: boolean;
  icon?: JSX.Element;
  rounded?: "lg" | "xl";
}

export const Input: React.FC<InputProps> = ({
  appearance: color = "accent",
  onChange,
  className,
  error,
  icon,
  allowClear,
  rounded = "xl",
  ...rest
}) => {
  return (
    <div className={`w-full flex relative items-center ${className ?? ""}`}>
      {icon && (
        <div className="absolute left-3 pointer-events-none">{icon}</div>
      )}
      <input
        className={`shadow-none box-border w-full focus:shadow-md transition-shadow duration-200 px-4 py-4 rounded-${rounded} placeholder:text-text-placeholder text-base outline-none disabled:text-text-disabled
        ${icon ? "pl-14" : ""}
        ${allowClear ? "pr-12" : ""}
        ${color === "primary" ? "bg-bg-primary" : "bg-bg-accent"}`}
        style={{
          boxShadow: error ? "0 0 0 1px rgb(var(--colors-error))" : "",
        }}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
      {allowClear && rest.value && (
        <button
          className="absolute w-5 text-gray-500/50 right-4 focus:outline-none hover:text-gray-500/80"
          onClick={() => onChange?.("")}
        >
          <ClearSvg />
        </button>
      )}
    </div>
  );
};
