import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps {
  options: DropdownOption[]
  selected: string
  onChange: (value: string) => void
  placeholder?: string
}

export function Dropdown({ options, selected, onChange, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-60">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-300 shadow-sm hover:bg-white/90 transition"
      >
        <span>{selected ? options.find((o) => o.value === selected)?.label : placeholder}</span>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg z-50 overflow-hidden">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setIsOpen(false)
              }}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100/50 transition"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
