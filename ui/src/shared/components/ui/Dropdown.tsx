import { useState } from "react";
import Chevron from "@/assets/dropdown_chevron.svg";

export const Dropdown = ({
  items,
  value,
  onChange,
  className,
}: {
  items: string[];
  value: string;
  onChange: (item: string) => void;
  className: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`${className} bg-bg-accent shadow-none rounded-xl cursor-pointer hover:shadow-sm transition-shadow select-none`}
    >
      <div
        className="p-4 flex justify-between items-center gap-4"
        onClick={() => {
          setExpanded((prev) => !prev);
        }}
      >
        {value}
        <Chevron width={16} className={`${expanded ? "rotate-180" : ""}`} />
        ``
      </div>
      {expanded ? (
        <div className="flex flex-col">
          {items.map((item) => (
            <div className="p-4 h-6 hover:bg-bg-primary">{item}</div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
