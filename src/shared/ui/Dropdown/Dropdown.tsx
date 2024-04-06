import React, { useState } from "react";
import Link from "next/link";

interface DropdownProps {
  buttonStyle?: string;
  listStyle?: string;
  options: string[];
  onClick?: () => void;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonStyle = "",
  listStyle = "",
  options,
  onClick,
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
          <div className={`absolute left-[-50px] top-[10px] ${listStyle}`}>
            {options.map((option, index) => (
              <Link href={"/routs/settings/"}>
                <div className={"cursor-pointer"} key={index}>
                  {option}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
