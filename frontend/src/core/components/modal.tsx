import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  type DialogProps
} from "@mui/material";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps extends Omit<DialogProps, 'open' | 'onClose'> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showCloseButton?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'md',
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
      {...props}
      PaperProps={{
        className: "rounded-2xl border border-slate-200 shadow-xl",
        ...props.PaperProps
      }}
    >
      {(title || showCloseButton) && (
        <DialogTitle className="flex items-center justify-between p-6 pb-4">
          {title && (
            <h2 className="text-xl font-bold text-blue-900">{title}</h2>
          )}
          {showCloseButton && (
            <IconButton
              onClick={onClose}
              size="small"
              className="hover:bg-slate-100 transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent className="px-6 py-0">
        {children}
      </DialogContent>

      {actions && (
        <DialogActions className="p-6 pt-4">
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}