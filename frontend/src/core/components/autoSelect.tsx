import {
  Autocomplete as MuiAutocomplete,
  TextField,
  type AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material";
import { forwardRef, useId } from "react";
import { CircularProgress } from "@mui/material";

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface BaseAutoSelectProps extends Omit<
  MuiAutocompleteProps<Option, false, false, false>,
  "renderInput" | "options"
> {
  label: string;
  helperText?: string;
  options: Option[];
  placeholder?: string;
  error?: boolean;
  loading?: boolean;
}

const AutoSelect = forwardRef<HTMLInputElement, BaseAutoSelectProps>(
  ({ label, helperText, options, placeholder, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-blue-900 transition-colors"
        >
          {label}
        </label>

        <MuiAutocomplete
          id={id}
          options={options}
          loading={props.loading}
          loadingText="Carregando..."
          noOptionsText="Nenhuma opção"
          getOptionLabel={(option) => option.label}
          getOptionDisabled={(option) => option.disabled || false}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              error={error}
              helperText={helperText}
              inputRef={ref}
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {props.loading ? (
                      <CircularProgress color="inherit" size={16} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
            />
          )}
          {...props}
        />
      </div>
    );
  },
);

AutoSelect.displayName = "AutoSelect";

export default AutoSelect;
