import React from "react";
import cn from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={cn(className, "bg-transparent outline-none border-none w-full")}
      {...rest}
    />
  );
};

export default Input;
