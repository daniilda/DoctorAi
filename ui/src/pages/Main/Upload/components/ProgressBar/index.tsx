const ProgressBar = ({ value, error }: { value: number; error?: boolean }) => (
  <div className="relative flex bg-gray-900 h-16 w-full max-w-sm rounded-xl overflow-hidden shadow-xl">
    <div
      className={`transition-all duration-100 ${
        error ? "bg-status-error" : "bg-primary"
      }`}
      style={{
        width: value + "%",
      }}
    ></div>
    <p
      className={
        "absolute font-medium text-text-onPrimary text-2xl inset-0 flex items-center justify-center"
      }
    >
      {value === 100
        ? error
          ? "Анализ не заврешен"
          : "Происходит анализ"
        : `${value}%`}
    </p>
  </div>
);

export default ProgressBar;
