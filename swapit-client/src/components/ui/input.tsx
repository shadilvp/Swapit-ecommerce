interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }
  
  export default function Input({ value, onChange, placeholder }: InputProps) {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  }
  