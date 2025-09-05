"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
  value?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="radio"
        ref={ref}
        data-slot="radio"
        className={cn(
          "peer  border-pink-500 dark:bg-input/30 checked:bg-white checked:text-red-500 dark:checked:bg-red-500 checked:border-pink-500 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-full border-2 shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 appearance-none relative",
          "checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:size-2 checked:after:rounded-full checked:after:bg-pink-500",
          className
        )}
        {...props}
      />
    )
  }
)
Radio.displayName = "Radio"

interface RadioGroupProps {
  children: React.ReactNode;
  className?: string;
  name?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ 
  children, 
  className, 
  name, 
  defaultValue,
  onChange 
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioProps>(child)) {
          return React.cloneElement(child, {
            name: name,
            defaultChecked: child.props.value === defaultValue,
            onChange: handleChange,
          } as Partial<RadioProps>);
        }
        return child;
      })}
    </div>
  );
};

export { Radio, RadioGroup }