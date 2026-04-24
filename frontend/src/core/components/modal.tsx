import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Divider,
  Fade,
  type DialogProps
} from "@mui/material";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps extends Omit<DialogProps, 'open' | 'onClose'> {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showCloseButton?: boolean;
}

export default function Modal({
  open,
  onClose,
  title = "",
  subtitle,
  children,
  actions,
  maxWidth = 'lg',
  fullWidth = true,
  showCloseButton = true,
  ...props
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      TransitionComponent={Fade}
      transitionDuration={400}
      {...props}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          backgroundImage: "none",
          boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
          border: "1px solid",
          borderColor: "divider",
        },
        ...props.PaperProps
      }}
    >
      {(title || showCloseButton) && (
        <DialogTitle sx={{ p: 3, pb: subtitle ? 1 : 2 }}>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            <Box>
              {title && (
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm font-medium text-slate-500 mt-0.5">
                  {subtitle}
                </p>
              )}
            </Box>

            {showCloseButton && (
              <IconButton
                onClick={onClose}
                size="small"
                sx={{
                  color: "text.disabled",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "error.lighter",
                    color: "error.main",
                    transform: "rotate(90deg)"
                  }
                }}
              >
                <X size={20} />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
      )}

      {/* Divisor opcional para destacar o header */}
      <Divider sx={{ opacity: 0.6 }} />

      <DialogContent sx={{ p: 3, py: 4 }}>
        <Box className="text-slate-600">
          {children}
        </Box>
      </DialogContent>

      {actions && (
        <>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <DialogActions sx={{ p: 3, backgroundColor: 'rgba(248, 250, 252, 0.5)' }}>
            {actions}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}