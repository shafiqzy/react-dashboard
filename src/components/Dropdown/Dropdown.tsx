import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface DropdownItem {
  label: React.ReactNode;
  onClick: () => void;
  startIcon?: React.ReactNode; // optional start icon
  endIcon?: React.ReactNode; // optional end icon
}

interface DropdownProps {
  buttonContent: React.ReactNode;
  items: DropdownItem[];
  apiItems?: DropdownItem[]; // optional API items
  position?: "left" | "right";
  className?: string;
  defaultActiveIndex?: number;
}

export default function Dropdown({
  buttonContent,
  items,
  apiItems = [],
  position = "right",
  className,
  defaultActiveIndex = 0,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mergedItems = [...items, ...apiItems];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        "ds-dropdown",
        position === "right" ? "ds-dropdown-end" : "ds-dropdown-left",
        className
      )}
    >
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="ds-btn ds-btn-ghost"
      >
        {buttonContent}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="ds-dropdown-content ds-menu p-2 shadow bg-base-300 rounded-box w-fit space-y-2">
          {mergedItems.map((item, idx) => (
            <li key={idx}>
              <button
                className={clsx(
                  "w-full flex items-center justify-between px-2 py-1 rounded",
                  activeIndex === idx && "bg-primary text-primary-content"
                )}
                onClick={() => {
                  item.onClick();
                  setActiveIndex(idx);
                  setIsOpen(false);
                }}
              >
                {/* Start icon + Label */}
                <span className="flex items-center space-x-2">
                  {item.startIcon && (
                    <span className="inline-flex">{item.startIcon}</span>
                  )}
                  <span className="whitespace-nowrap">{item.label}</span>{" "}
                  {/* No wrap here */}
                </span>

                {/* End icon */}
                {item.endIcon && (
                  <span className="inline-flex">{item.endIcon}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
