interface ButtonProps {
  children: any;
  onClick?: () => void;
  variant?: any;
}

export default function Button({ children, onClick, variant = "default" }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded focus:outline-none";
  const variants: any = {
    default: "bg-green-700 text-white hover:bg-green-900",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant] || ""}`}>
      {children}
    </button>
  );
}
