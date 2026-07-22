type Props = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  compact?: boolean;
  className?: string;
};

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  inverse = false,
  compact = false,
  className = "",
}: Props) {
  const centered = align === "center";
  const dash = (
    <span
      aria-hidden="true"
      className={`inline-block h-[1.5px] w-[22px] shrink-0 ${inverse ? "bg-white/80" : "bg-brand"}`}
    />
  );

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`.trim()}>
      <p
        className={`label-tag flex items-center gap-2.5 ${centered ? "justify-center" : ""} ${
          inverse ? "text-white/90" : "text-brand-accent"
        }`}
      >
        {dash}
        <span>{label}</span>
        {centered && dash}
      </p>
      <h2
        className={`${compact ? "display-md" : "display-lg"} heading-wrap mt-3 ${
          inverse ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`lead mt-4 max-w-2xl ${centered ? "mx-auto" : ""} ${inverse ? "text-white/85" : "text-g3"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
