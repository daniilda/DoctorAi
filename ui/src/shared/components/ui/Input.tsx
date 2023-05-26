import ClearSvg from "@/assets/clear.svg";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  appearance?: "primary" | "accent";
  onChange?: (text: string) => void;
  error?: boolean;
  allowClear?: boolean;
}

export const Input: React.FC<InputProps> = ({
  appearance: color = "accent",
  onChange,
  className,
  error,
  allowClear,
  ...rest
}) => {
  return (
    <div className="w-full flex relative items-center">
      <input
        className={`shadow-none box-border w-full focus:shadow-md transition-shadow duration-200 px-4 py-4 rounded-xl placeholder:text-text-placeholder text-base outline-none
      ${color === "primary" ? "bg-bg-primary" : "bg-bg-accent"} ${
          className ?? ""
        }`}
        style={{
          boxShadow: error ? "0 0 0 1px rgb(var(--colors-error))" : "",
        }}
        onChange={(e) => onChange && onChange(e.target.value)}
        {...rest}
      />
      {allowClear && rest.value && (
        <button
          className="absolute w-5 text-gray-500/50 right-4 focus:outline-none top-7 hover:text-gray-500/80"
          onClick={() => onChange && onChange("")}
        >
          <ClearSvg />
        </button>
      )}
    </div>
  );
};
