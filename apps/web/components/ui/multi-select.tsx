import React, { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface MultiSelectProps {
  options: Option[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onValueChange,
  placeholder = 'Select options...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];

    onValueChange?.(newValue);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = value.filter(v => v !== optionValue);
    onValueChange?.(newValue);
  };

  const getSelectedLabels = () => {
    return value.map(v => options.find(opt => opt.value === v)?.label || v);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-left bg-auth-color-input border border-pink-500 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-red-500"
      >
        <div className="flex items-center flex-wrap gap-1 min-h-[1.5rem]">
          {value.length === 0 ? (
            <span className="text-auth-color-placeholder text-sm">{placeholder}</span>
          ) : (
            getSelectedLabels().map((label, index) => {
              const option = options.find(opt => opt.value === value[index]);
              return (
                <span
                  key={value[index]}
                  className="inline-flex items-center px-2 py-1 text-xs bg-pink-600 text-white rounded-md gap-1"
                >
                  {option?.icon && (
                    <span className="flex items-center justify-center w-3 h-3">{option.icon}</span>
                  )}
                  {label}
                  <span
                    onClick={e => handleRemove(value[index], e)}
                    className="ml-1 hover:text-yellow-300 cursor-pointer"
                  >
                    <X size={12} />
                  </span>
                </span>
              );
            })
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-pink-500 rounded-md shadow-lg max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-auth-color-input focus:outline-none focus:bg-auth-color-input"
            >
              {/* Checkbox */}
              <div className="flex items-center justify-center w-4 h-4 border border-pink-500 rounded bg-white">
                {value.includes(option.value) && <Check size={12} className="text-pink-600" />}
              </div>

              {/* Icon */}
              {option.icon && (
                <span className="flex items-center justify-center w-4 h-4">{option.icon}</span>
              )}

              <span className="flex-1">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
// overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
