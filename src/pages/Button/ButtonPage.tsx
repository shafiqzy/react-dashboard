import DsButton from "src/components/Button/Button";

const colors = [
  "primary",
  "secondary",
  "accent",
  "info",
  "success",
  "warning",
  "error",
  "neutral",
] as const;

const variants = ["fill", "outline", "ghost"] as const;

export default function ButtonPage() {
  return (
    <div className="min-h-screen bg-base-100 p-8 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        🎨 DaisyUI Buttons with `ds-` Prefix
      </h1>

      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap gap-3">
          <h2 className="w-full font-semibold capitalize mb-2">
            {variant} variant:
          </h2>
          {colors.map((color) => (
            <DsButton key={color} color={color} variant={variant}>
              {color}
            </DsButton>
          ))}
        </div>
      ))}
    </div>
  );
}
