interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span>{label}</span>
      </label>
    );
  }
  