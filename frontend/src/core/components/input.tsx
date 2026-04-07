import { Input as MuiInput, type InputProps as MuiInputProps } from "@mui/material";
import { forwardRef, useId } from "react";

interface BaseInputProps extends MuiInputProps {
  label: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, helperText, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label 
          htmlFor={id} 
          className="text-sm font-semibold text-blue-900 transition-colors"
        >
          {label}
        </label>
        <MuiInput
          id={id}
          ref={ref}
          error={error}
          fullWidth
          {...props}
        />
        {helperText && (
          <span className={`text-[11px] font-medium ${error ? 'text-red-500' : 'text-slate-500'}`}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;