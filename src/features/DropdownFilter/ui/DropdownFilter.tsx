"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";

type Option = {
  label: ReactNode | any | string;
  onClick?: () => void;
  path?: string; // New property to determine the path to navigate
};

interface DropdownProps {
  buttonStyle?: string;
  listStyle?: string;
  options: Option[];
  defaultLabel: string | any; // Add a default label prop
  onSelect?: (label: string) => void; // Pass the selected label to onSelect function
}

const DropdownFilter: React.FC<DropdownProps> = ({
  buttonStyle = "",
  listStyle = "",
  options,
  defaultLabel,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(defaultLabel);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    if (onSelect) {
      onSelect(option.label);
    }
    setSelectedLabel(option.label);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button className={buttonStyle} onClick={toggleDropdown}>
        {selectedLabel}
      </button>
      {isOpen && (
        <div className="absolute z-50 left-[-50px]">
          <div className={`flex flex-col items-center ${listStyle}`}>
            {options?.map((option, index) => (
              <div key={index} className="whitespace-nowrap">
                {option.path ? (
                  <Link
                    href={option.path}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </Link>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
