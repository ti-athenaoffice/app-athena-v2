import {
  TextField as MuiTextField,
  Box,
  Button,
  type TextFieldProps as MuiTextFieldProps
} from "@mui/material";
import { forwardRef, useId } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Code
} from "lucide-react";

interface BaseTextAreaProps extends Omit<MuiTextFieldProps, 'multiline' | 'variant'> {
  label: string;
  helperText?: string;
  enableFormatting?: boolean;
}

const TextArea = forwardRef<HTMLDivElement, BaseTextAreaProps>(
  ({ label, helperText, enableFormatting = false, error, ...props }, ref) => {
    const id = useId();

    const insertFormatting = (before: string, after: string = '') => {
      const textarea = document.getElementById(id) as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      const newText = textarea.value.substring(0, start) + before + selectedText + after + textarea.value.substring(end);

      textarea.value = newText;
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);

      // Trigger change event for react-hook-form
      const event = new Event('input', { bubbles: true });
      textarea.dispatchEvent(event);
    };

    const formattingButtons = [
      { icon: Bold, action: () => insertFormatting('**', '**'), label: 'Negrito' },
      { icon: Italic, action: () => insertFormatting('*', '*'), label: 'Itálico' },
      { icon: Underline, action: () => insertFormatting('<u>', '</u>'), label: 'Sublinhado' },
      { icon: Code, action: () => insertFormatting('`', '`'), label: 'Código' },
      { icon: List, action: () => insertFormatting('- '), label: 'Lista' },
      { icon: ListOrdered, action: () => insertFormatting('1. '), label: 'Lista Ordenada' },
      { icon: Link, action: () => insertFormatting('[', '](url)'), label: 'Link' },
    ];

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label com a cor Azul Profissional do seu tema */}
        <label
          htmlFor={id}
          className="text-sm font-semibold text-blue-900 transition-colors"
        >
          {label}
        </label>

        {/* Barra de formatação (opcional) */}
        {enableFormatting && (
          <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
            {formattingButtons.map(({ icon: Icon, action, label }) => (
              <Button
                key={label}
                size="small"
                variant="outlined"
                onClick={action}
                sx={{
                  minWidth: 'auto',
                  px: 1,
                  py: 0.5,
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  '&:hover': {
                    borderColor: '#2563eb',
                    color: '#2563eb',
                    bgcolor: '#eff6ff',
                  },
                }}
                title={label}
              >
                <Icon size={16} />
              </Button>
            ))}
          </Box>
        )}

        <MuiTextField
          id={id}
          ref={ref}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          error={error}
          helperText={helperText}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: error ? '#ef4444' : '#cbd5e1',
              },
              '&:hover fieldset': {
                borderColor: error ? '#ef4444' : '#2563eb',
              },
              '&.Mui-focused fieldset': {
                borderColor: error ? '#ef4444' : '#2563eb',
              },
            },
            '& .MuiFormHelperText-root': {
              fontSize: '11px',
              fontWeight: 500,
              color: error ? '#ef4444' : '#64748b',
            },
          }}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;