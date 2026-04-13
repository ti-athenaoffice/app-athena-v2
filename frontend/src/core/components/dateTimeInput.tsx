import { forwardRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"; // Alterado aqui
import { ptBR } from "@mui/x-date-pickers/locales";
import { Box, Typography, FormHelperText } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

// Configura o dayjs para português
dayjs.locale("pt-br");

interface DateTimeInputProps {
  label: string;
  value: string | null;
  onChange: (date: string | null) => void;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const DateTimeInput = forwardRef<HTMLDivElement, DateTimeInputProps>(
  ({ label, value, onChange, error, helperText, fullWidth = true, disabled }, ref) => {
    return (
      <LocalizationProvider 
        dateAdapter={AdapterDayjs} 
        adapterLocale="pt-br"
        localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        <Box sx={{ width: fullWidth ? '100%' : 'auto', mb: 1 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 700, 
              mb: 0.5, 
              display: "block", 
              color: error ? "error.main" : "text.secondary",
              textTransform: "uppercase",
              fontSize: '10px'
            }}
          >
            {label}
          </Typography>
          
          <DateTimePicker // Alterado de DatePicker para DateTimePicker
            ref={ref}
            disabled={disabled}
            value={value ? dayjs(value) : null}
            ampm={false} // Força o formato 24h (Padrão Brasil)
            format="DD/MM/YYYY HH:mm" // Formato visível no campo
            onChange={(newValue: Dayjs | null) => {
              // Envia a string ISO completa para o Laravel
              onChange(newValue && newValue.isValid() ? newValue.toISOString() : null);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                error: error,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    fontSize: '0.875rem'
                  }
                }
              }
            }}
          />
          
          {helperText && (
            <FormHelperText error={error} sx={{ ml: 1 }}>
              {helperText}
            </FormHelperText>
          )}
        </Box>
      </LocalizationProvider>
    );
  }
);

DateTimeInput.displayName = "DateInput";