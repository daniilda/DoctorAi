const ProgressBar = ({ value }: { value: number }) => (
  <div className="relative flex bg-text-main h-16 w-full max-w-sm rounded-xl overflow-hidden shadow-xl">
    <div
      className="bg-primary transition-all duration-100"
      style={{
        width: value + "%",
      }}
    ></div>
    <p className="absolute font-medium text-text-onPrimary text-2xl inset-0 flex items-center justify-center">
      {value === 100 ? "Происходит анализ" : `${value}%`}
    </p>
  </div>
);

export default ProgressBar;
