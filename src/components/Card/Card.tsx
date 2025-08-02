import clsx from "clsx";

interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  stat?: string | number;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  icon,
  stat,
  children,
  footer,
  className,
}: CardProps) {
  const isStatCard = Boolean(stat); // ✅ detect if it's a stat card

  return (
    <div
      className={clsx(
        "ds-card bg-base-200 shadow-md rounded-xl p-4",
        isStatCard ? "flex flex-col items-center text-center" : "", // ✅ only center for stat cards
        className
      )}
    >
      {/* Title + Icon */}
      {(title || icon) && (
        <div
          className={clsx(
            "mb-2 w-full",
            isStatCard ? "flex items-center justify-center space-x-2" : ""
          )}
        >
          {icon && <div className="text-2xl">{icon}</div>}
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
        </div>
      )}

      {/* Stat (only for stat cards) */}
      {stat && (
        <div className="text-3xl font-bold text-primary mb-2">{stat}</div>
      )}

      {/* Body (chart or text) */}
      <div className={clsx(!isStatCard && "w-full")}>{children}</div>

      {/* Footer (optional) */}
      {footer && (
        <div className="pt-3 mt-auto border-t border-base-300 w-full">
          {footer}
        </div>
      )}
    </div>
  );
}
