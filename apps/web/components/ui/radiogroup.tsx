'use client';

interface RadioGroupProps {
  name: string;
  label: string;
  className?: string;
  id: string;
}

export default function RadioGroup({
  name,
  label,
  className,
  id,
}: RadioGroupProps) {
  return (
    <div className="relative flex items-center space-x-2">
      <input
        className={`${className ?? ''} peer`}
        type="radio"
        id={id}
        name={name}
      />
      <label
        className="cursor-pointer text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-pink-400"
        htmlFor={id}
      >
        {label}
      </label>
      <svg
        className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-pink-500
          peer-checked:scale-100 peer-checked:opacity-100 peer-hover:fill-pink-500 peer-focus:fill-pink-500 peer-disabled:cursor-not-allowed"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="title-02 description-02"
        role="graphics-symbol"
      >
        <title id="title-02">Circle Shape</title>
        <desc id="description-02">
          Circle shape to indicate whether the radio input is checked or not.
        </desc>
        <circle cx="8" cy="8" r="4" />
      </svg>
    </div>
  );
}
