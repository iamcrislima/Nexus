import type React from "react";

interface FAIconProps {
  icon: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function FAIcon({ icon, style, onClick }: FAIconProps) {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: `<i class="${icon}"></i>` }}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", lineHeight: 1, ...style }}
      onClick={onClick}
    />
  );
}
