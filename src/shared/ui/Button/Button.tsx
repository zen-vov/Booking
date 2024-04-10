"use client";
import React, { forwardRef, Ref } from "react";
import cn from "classnames";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label: React.ReactNode | string;
  labelStyle?: string;
}

const Button = forwardRef((props: IButton, ref: Ref<HTMLButtonElement>) => {
  const { className, label, labelStyle, ...rest } = props;

  return (
    <button ref={ref} className={cn(className)} {...rest}>
      <span className={labelStyle}>{label}</span>
    </button>
  );
});
Button.displayName = "Button";
export default Button;
