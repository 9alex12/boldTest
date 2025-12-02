"use client";

import { useRef, useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import SettingIcon from "./icons/SettingsIcon";

interface FilterProps {
  options: { label: string; value: string }[];
  onSubmit: (values: string[]) => void;
  values?: string[];
}

const Filter = ({ options, onSubmit, values = [] }: FilterProps) => {
  const [checked, setChecked] = useState<string[]>(values);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  return (
    <details
      data-testid="filter-details"
      ref={detailsRef}
      className="relative self-end flex flex-col bg-white shadow-md rounded"
    >
      <summary data-testid="filter-summary" className="flex p-4 gap-2 justify-end list-none cursor-pointer min-w-32 font-bold">
        Filtrar <SettingIcon />
      </summary>
      <div data-testid="filter-content" className="[content-visibility:auto_allow-discrete] transition-all scale-0 [details:open>&]:scale-100 flex flex-col p-4 select-none gap-5 absolute right-0 top-0 bg-white w-max shadow-md">
        <h4 className="flex justify-between items-center">
          <span></span>
          Filtrar
          <button
            aria-label="close-filter" 
            data-testid="close-filter-btn"
            onClick={() => {
              const detailsElement = detailsRef?.current;
              if (detailsElement) detailsElement.removeAttribute("open");
            }}
            className="cursor-pointer"
          >
            <CloseIcon className="justify-self-end" />
          </button>
        </h4>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-4 cursor-pointer"
            data-testid={`filter-option-label-${option.value}`}
          >
            <input
              className="size-4"
              type="checkbox"
              name=""
              id={option.value}
              value={option.value}
              data-testid={`filter-checkbox-${option.value}`}
              onChange={(e) => {
                const elem = e.target;
                const checked = elem.checked;
                const value = elem.value;
                if (checked) {
                  setChecked((prev) => [...prev, value]);
                } else {
                  setChecked((prev) =>
                    prev.filter((option) => option !== value)
                  );
                }
              }}
              checked={checked.includes(option.value)}
            />
            {option.label}
          </label>
        ))}
        <button
          className="text-xl p-3 rounded-full bg-bold-red text-white opacity-80 hover:opacity-100 active:opacity-90 shadow-md hover:shadow-lg"
          data-testid="apply-filter-btn"
          onClick={() => onSubmit(checked)}
        >
          Aplicar
        </button>
      </div>
    </details>
  );
};

export default Filter;
