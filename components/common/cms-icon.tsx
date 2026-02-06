import * as Icons from "lucide-react";

type Props = {
  iconName?: string | null;
  size?: number;
  className?: string;
};

export function CMSIcon({ iconName, size = 20, className = "text-white" }: Props) {
  if (!iconName) return null;

  const LucideIcon = (Icons as any)[
    iconName
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase()) // kebab → camel
      .replace(/^./, (c) => c.toUpperCase()) // capitalize first
  ];

  if (!LucideIcon) return null;

  return <LucideIcon size={size} className={className} />;
}
