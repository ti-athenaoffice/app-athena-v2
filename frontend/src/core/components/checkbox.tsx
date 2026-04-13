import { forwardRef } from "react";
import { 
  Checkbox as MuiCheckbox, 
  FormControlLabel, 
  Typography,
  FormHelperText,
  Box
} from "@mui/material";
import type { CheckboxProps as MuiCheckboxProps } from "@mui/material";

interface CheckboxProps extends MuiCheckboxProps {
  label: string;
  description?: string;
  helperText?: string;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, description, helperText, error, ...props }, ref) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
          control={
            <MuiCheckbox
              ref={ref}
              {...props}
              sx={{
                color: error ? 'error.main' : 'primary.main',
                '&.Mui-checked': {
                  color: 'primary.main',
                },
                ...props.sx,
              }}
            />
          }
          label={
            <Box sx={{ ml: 0.5 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600, 
                  color: error ? 'error.main' : 'text.primary',
                  lineHeight: 1.2
                }}
              >
                {label}
              </Typography>
              {description && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.2 }}>
                  {description}
                </Typography>
              )}
            </Box>
          }
        />
        {helperText && (
          <FormHelperText error={error} sx={{ ml: 4, mt: -0.5 }}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    );
  }
);

Checkbox.displayName = "Checkbox";