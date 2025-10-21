// src/components/ui/Card.tsx
/**
 * Reusable Card Component
 * Container for content
 */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "small" | "medium" | "large";
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  padding = "medium",
  hover = false,
}: CardProps) {
  const paddingStyles = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`
        bg-white rounded-xl shadow-md
        ${hover ? "hover:shadow-xl transition-shadow duration-300" : ""}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
