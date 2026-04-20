import { HelpCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import Modal from "./modal";
import Button from "./button";
import { Box, Typography } from "@mui/material";

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
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  isLoading = false,
  color = "primary",
}: ConfirmacaoProps) {
  const getIcon = () => {
    const size = 28;
    switch (color) {
      case "error":
        return <AlertTriangle size={size} />;
      case "warning":
        return <AlertTriangle size={size} />;
      case "success":
        return <CheckCircle2 size={size} />;
      default:
        return <HelpCircle size={size} />;
    }
  };

  const colorStyles = {
    error: "bg-red-50 text-red-600 border-red-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    primary: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="xs"
      title=""
      actions={
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isLoading}
            sx={{ minWidth: 100 }}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="contained"
            color={color as any}
            onClick={onConfirm}
            isLoading={isLoading}
            sx={{ minWidth: 120 }}
          >
            {confirmLabel}
          </Button>
        </Box>
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          pt: 1,
        }}
      >
        {/* Ícone com animação leve de entrada */}
        <Box
          className={`mb-4 p-4 rounded-full border ${colorStyles[color]} shadow-sm`}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {getIcon()}
        </Box>

        {/* Título da Confirmação */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}
        >
          {title || (color === "error" ? "Tem certeza?" : "Confirmar ação")}
        </Typography>

        {/* Mensagem */}
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", px: 2, lineHeight: 1.6 }}
        >
          {message}
        </Typography>
      </Box>
    </Modal>
  );
}
