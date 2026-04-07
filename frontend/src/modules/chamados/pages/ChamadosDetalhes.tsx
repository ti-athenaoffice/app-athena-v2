import type { Chamado } from "../types/Chamado";
import toast from "react-hot-toast";
import ChamadoHeader from "../components/ChamadoHeader";
import ChamadoTechnicalInfo from "../components/ChamadoTechnicalInfo";
import ChamadoDescription from "../components/ChamadoDescription";
import ChamadoHistory from "../components/ChamadoHistory";

interface ChamadoDetalhesProps {
  chamado: Chamado;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function ChamadoDetalhes({ chamado, onClose, onRefresh }: ChamadoDetalhesProps) {
  
  const handleFinalizar = async () => {
    if (window.confirm("Deseja realmente finalizar este chamado?")) {
      toast.success("Chamado finalizado com sucesso!");
      onRefresh?.();
      onClose();
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <ChamadoHeader chamado={chamado} onClose={onClose} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ChamadoTechnicalInfo chamado={chamado} />

        <div className="lg:col-span-3 space-y-8">
          <ChamadoDescription descricao={chamado.descricao} />
          <ChamadoHistory />
        </div>
      </div>
    </div>
  );
}

