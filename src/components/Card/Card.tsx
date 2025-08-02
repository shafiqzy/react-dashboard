import clsx from "clsx";

interface CardProps {
  title?: string; // ✅ Optional title at the top
  children: React.ReactNode; // ✅ Content inside the card
  footer?: React.ReactNode; // ✅ Optional footer
  className?: string; // ✅ For extra styling overrides
}

export default function Card({
  title,
  children,
  footer,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "ds-card bg-base-200 shadow-md rounded-xl p-4",
        className
      )}
    >
      {/* Title (optional) */}
      {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}

      {/* Body */}
      <div className="mb-3">{children}</div>

      {/* Footer (optional) */}
      {footer && <div className="pt-3 border-t border-base-300">{footer}</div>}
    </div>
  );
}
