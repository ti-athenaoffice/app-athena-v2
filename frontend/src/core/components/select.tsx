import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  FormHelperText,
  type SelectProps as MuiSelectProps
} from "@mui/material";
import { forwardRef, useId } from "react";

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface BaseSelectProps extends Omit<MuiSelectProps, 'children'> {
  label: string;
  helperText?: string;
  options: Option[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, BaseSelectProps>(
  ({ label, helperText, options, placeholder, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label com a cor Azul Profissional do seu tema */}
        <label 
          htmlFor={id} 
          className="text-sm font-semibold text-blue-900 transition-colors"
        >
          {label}
        </label>

        <FormControl fullWidth error={error}>
          <MuiSelect
            id={id}
            ref={ref}
            displayEmpty
            fullWidth
            variant="outlined"
            className="h-10"
            {...props}
          >
            {placeholder && (
              <MenuItem value="" disabled>
                <span className="text-slate-400">{placeholder}</span>
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </MuiSelect>

          {/* Feedback visual de erro ou informação */}
          {helperText && (
            <FormHelperText className={`text-[11px] font-medium ${error ? 'text-red-500' : 'text-slate-500'}`}>
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
