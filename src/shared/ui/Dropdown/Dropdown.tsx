"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../Button/Button";

type Option = {
  label: string;
  onClick?: () => void;
  path?: string; // Новое свойство для определения пути перехода
};

interface DropdownProps {
  buttonStyle?: string;
  listStyle?: string;
  options: Option[];
  label: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonStyle = "",
  listStyle = "",
  options,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button className={buttonStyle} onClick={toggleDropdown}>
        {label}
      </button>
      {isOpen && (
        <div className="relative">
          <div
            className={`absolute flet flex-col items-center left-[-50px] top-[10px] ${listStyle}`}
          >
            {options.map((option, index) => (
              <div key={index} className="whitespace-nowrap">
                {option.path ? (
                  <Link href={option.path}>{option.label}</Link>
                ) : (
                  <div className="cursor-pointer" onClick={option.onClick}>
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

export default Dropdown;

//

//
