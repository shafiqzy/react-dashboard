import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface DropdownItem {
  label: React.ReactNode;
  onClick: () => void;
  startIcon?: React.ReactNode; // ✅ per-item start icon
  endIcon?: React.ReactNode; // ✅ per-item end icon
}

interface DropdownProps {
  items: DropdownItem[];
  apiItems?: DropdownItem[];
  position?: "left" | "right";
  className?: string;
  defaultActiveIndex?: number;

  /** ✅ Optional global button icons (used only if activeItem has none) */
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export default function Dropdown({
  items,
  apiItems = [],
  position = "right",
  className,
  defaultActiveIndex = 0,
  startIcon,
  endIcon,
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

  const activeItem = mergedItems[activeIndex];

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        "ds-dropdown",
        position === "right" ? "ds-dropdown-end" : "ds-dropdown-left",
        className
      )}
    >
      {/* ✅ Trigger Button — show item icon if available, otherwise fallback to parent icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="ds-btn ds-btn-ghost flex items-center space-x-2"
      >
        {/* ✅ Start Icon Priority: activeItem.startIcon → global startIcon */}
        {activeItem?.startIcon ?? startIcon ? (
          <span>{activeItem?.startIcon ?? startIcon}</span>
        ) : null}

        {/* ✅ Active Label */}
        <span>{activeItem?.label}</span>

        {/* ✅ End Icon Priority: activeItem.endIcon → global endIcon */}
        {activeItem?.endIcon ?? endIcon ? (
          <span>{activeItem?.endIcon ?? endIcon}</span>
        ) : null}
      </button>

      {/* ✅ Dropdown Menu */}
      {isOpen && (
        <ul className="ds-dropdown-content ds-menu p-2 shadow bg-base-300 rounded-box w-fit space-y-2">
          {mergedItems.map((item, idx) => (
            <li
              key={`dropdown-${
                typeof item.label === "string" ? item.label : idx
              }`}
            >
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
                {/* ✅ Start icon + Label */}
                <span className="flex items-center space-x-2">
                  {item.startIcon && (
                    <span className="inline-flex">{item.startIcon}</span>
                  )}
                  <span className="whitespace-nowrap">{item.label}</span>
                </span>

                {/* ✅ End icon */}
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
