import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex items-center gap-2 bg-black text-white/90 cursor-pointer px-4 py-2 text-sm rounded-md border border-white  font-inter font-normal"
    >
      {value || "Select date"}
      <ChevronDown className="w-5 h-5" />
    </button>
  )
);

CustomInput.displayName = "CustomInput";

export default function DateFilter() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="w-fit md:flex hidden">
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        customInput={<CustomInput />}
        dateFormat="MMMM d, yyyy"
      />
    </div>
  );
}
