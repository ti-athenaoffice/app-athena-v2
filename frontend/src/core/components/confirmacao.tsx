import { HelpCircle } from "lucide-react";
import Modal from "./modal";
import Button from "./button";

interface ConfirmacaoProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  color?: "primary" | "error" | "warning" | "success";
}

export default function Confirmacao({
  open,
  onClose,
  onConfirm,
  title = "Confirmar Ação",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  isLoading = false,
  color = "primary",
}: ConfirmacaoProps) {
  
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="sm"
      actions={
        <div className="flex gap-3 w-full justify-end">
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="contained"
            color={color as any}
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="flex items-start gap-4 py-4">
        <div className={`p-3 rounded-full flex-shrink-0 ${
          color === 'error' ? 'bg-red-50 text-red-600' :
          color === 'warning' ? 'bg-amber-50 text-amber-600' :
          'bg-blue-50 text-blue-600'
        }`}>
          <HelpCircle size={24} />
        </div>
        <div>
          <p className="text-slate-600 leading-relaxed text-base">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
}
