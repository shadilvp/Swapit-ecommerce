import { ReactNode } from "react";

interface SelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

export default function Select({ value, onChange, children }: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  );
}
