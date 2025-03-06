import { useState, ReactNode } from "react";

interface DropdownMenuProps {
  children: ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-40">
      <button onClick={() => setIsOpen(!isOpen)} className="border px-4 py-2 rounded">
        Filters
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4">
          {children}
        </div>
      )}
    </div>
  );
}
