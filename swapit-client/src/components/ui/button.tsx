import { ReactNode } from "react";

type ButtonVariant = "default" | "outline";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
}

export default function Button({ children, onClick, variant = "default" }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded focus:outline-none";

  const variants: Record<ButtonVariant, string> = {
    default: "bg-green-700 text-white hover:bg-green-900",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}
