import { CircularProgress } from "@mui/material";

interface LoadingProps {
  message?: string;
  size?: number
}

export default function Loading({ message = "Carregando...", size = 60 }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <CircularProgress className="animate-spin text-gray-600" size={size} />
      <p className="text-sm text-slate-600">{message}</p>
    </div>
  );
}