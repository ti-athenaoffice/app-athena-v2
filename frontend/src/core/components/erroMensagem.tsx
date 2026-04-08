import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErroMensagem({
  title = "Erro ao carregar",
  message = "Ocorreu um erro inesperado.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <AlertCircle className="text-red-500" size={32} />

      <div>
        <p className="text-red-600 font-semibold">{title}</p>
        <p className="text-slate-600 text-sm mt-1">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}