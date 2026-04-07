import { Button as MuiButton, type ButtonProps as MuiButtonProps, CircularProgress } from "@mui/material";
import { forwardRef } from "react";

interface CustomButtonProps extends MuiButtonProps {
  isLoading?: boolean;
  
}

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, isLoading, disabled, startIcon, className, ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          h-10 normal-case font-bold px-6 py-2.5 rounded-lg transition-all active:scale-95
          ${props.variant === 'contained' || !props.variant ? 'bg-[#2250cf] hover:bg-[#1d48be] shadow-md' : ''}
          ${className}
        `}
        startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : startIcon}
        {...props}
      >
        {isLoading ? "Aguarde..." : children}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";

export default Button;