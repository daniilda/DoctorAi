import React, { useRef, useState } from "react";
import Chevron from "@/assets/dropdown_chevron.svg";
import { useClickOutside } from "@/utils/useClickOutside";

interface DropdownProps<T = string> {
  items: T[];
  value?: string;
  onChange: (item: T) => void;
  className?: string;
}

export function Dropdown<T = string>({
  items,
  value,
  onChange,
  className,
}: DropdownProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useClickOutside<HTMLDivElement>([dropdownRef], () => setExpanded(false));
  return (
    <div
      ref={dropdownRef}
      className={`${
        className ?? ""
      } relative bg-bg-accent shadow-none rounded-xl cursor-pointer hover:shadow-sm transition-shadow select-none ${
        expanded ? "rounded-b-none" : ""
      }`}
    >
      <div
        className={`h-full min-h-[56px] px-6 flex border-text-accent border-[1px] rounded-xl justify-between items-center gap-4 ${
          expanded ? "rounded-b-none" : ""
        }`}
        onClick={() => {
          setExpanded((prev) => !prev);
        }}
      >
        {value}
        <Chevron
          width={16}
          className={`${expanded ? "" : "rotate-180"} ml-auto`}
        />
      </div>
      {expanded ? (
        <div className="absolute border-text-accent border-[1px] border-t-0 bg-bg-accent rounded-b-xl overflow-hidden shadow-sm left-0 right-0 flex flex-col">
          {items.map((item, index) => (
            <div
              key={index}
              className="first:border-t-0 min-h-10 whitespace-pre-wrap border-t-text-accent border-t-[1px] py-4 px-6 hover:bg-bg-primary"
              onClick={() => {
                onChange(item);
                setExpanded(false);
              }}
            >
              {item as React.ReactNode}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
