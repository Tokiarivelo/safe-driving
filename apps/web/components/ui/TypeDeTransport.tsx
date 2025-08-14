"use client";

import { useState } from "react";

type TransportTypeOption = {
  id: string;
  name: string;
  icon?: React.ReactNode;
};

type TransportTypeProps = {
  options: TransportTypeOption[];
  onChange?: (selected: string[]) => void;
};

export default function TransportType({ options, onChange }: TransportTypeProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      onChange?.(newSelected);
      return newSelected;
    });
  };

  return (
    <div className="flex gap-3">
      {options.map((t) => (
        <button
          key={t.id}
          onClick={() => toggle(t.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
            ${selected.includes(t.id) ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          {t.icon} {t.name}
        </button>
      ))}
    </div>
  );
}
