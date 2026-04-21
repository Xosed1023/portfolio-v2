import { getTechColor } from "@/lib/tech-colors";

interface TechBadgeProps {
  name: string;
  fontSize?: string;
  padding?: string;
  letterSpacing?: string;
}

export default function TechBadge({
  name,
  fontSize = "0.69rem",
  padding = "3px 9px",
  letterSpacing = "0.18em",
}: TechBadgeProps) {
  const { color, border, bg } = getTechColor(name);
  return (
    <span
      className="font-poppins font-medium"
      style={{
        fontSize,
        letterSpacing,
        padding,
        border: `1px solid ${border}`,
        color,
        background: bg,
      }}
    >
      {name}
    </span>
  );
}
