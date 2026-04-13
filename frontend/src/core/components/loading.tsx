import { CircularProgress } from "@mui/material";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Carregando..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <CircularProgress className="animate-spin text-gray-600" size={60} />
      <p className="text-sm text-slate-600">{message}</p>
    </div>
  );
}