import * as React from 'react';
import { cn } from '@/lib/utils';

type ToggleSwitchProps = {
  className?: string;
  isOn: boolean;
  onToggle: () => void;
};

export default function ToggleSwitch({
  className,
  isOn,
  onToggle
}: ToggleSwitchProps) {
  return (
    <label className={cn("relative inline-flex items-center cursor-pointer", className)}>
      <input
        type="checkbox"
        checked={isOn}
        onChange={onToggle}
        className="sr-only peer"
      />
      {/* Track */}
      <div className="w-11 h-5 border-2 border-pink-500 peer-checked:bg-pink-500 rounded-full transition-colors duration-300"></div>
      {/* Thumb */}
      <div className="absolute left-1 top-1 w-3 h-3 bg-pink-500 peer-checked:w-4 peer-checked:h-4 peer-checked:top-0.5 peer-checked:bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
    </label>
  );
}

// import * as React from 'react';
// import { cn } from '@/lib/utils';

// type ToggleSwitchProps = React.ComponentProps<'input'> & {
//   className?: string;
//   inputClassname?: string;
//   isOn: boolean;
//   onToggle: () => void;
// };

// export default function ToggleSwitch({
//   className = 'mb-1 border border-[#E33486] text-auth-color-text-custom-magenta rounded w-full p-2.5 bg-auth-color-input',
//   inputClassname,
//   isOn,
//   onToggle,
//   ...props
// }: ToggleSwitchProps) {
//   return (
//     <div className={cn(className, 'relative flex items-center')}>
//       <label className="relative inline-flex items-center cursor-pointer">
//         <input
//           type="checkbox"
//           checked={isOn}
//           onChange={onToggle}
//           className={cn(
//             inputClassname,
//             'sr-only peer outline-none focus:outline-none focus:ring-0 ring-0',
//           )}
//           {...props}
//         />
//         <div className="w-11 h-5 border-2 border-[#E33486] rounded-full peer peer-checked:bg-[#E33486] transition-all duration-300 bg-auth-color-input"></div>
//         <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
//       </label>
//     </div>
//   );
// }