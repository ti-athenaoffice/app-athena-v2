import type { Chamado } from "../types/Chamado";
import ChamadoHeader from "../components/ChamadoHeader";
import ChamadoTechnicalInfo from "../components/ChamadoTechnicalInfo";
import ChamadoDescription from "../components/ChamadoDescricao";
import ChamadoChat from "../components/ChamadoChat";

interface ChamadoDetalhesProps {
  chamado: Chamado;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function ChamadoDetalhes({ chamado, onClose }: ChamadoDetalhesProps) {
  return (
    <div className="space-y-6 font-sans">
      <ChamadoHeader chamado={chamado} onClose={onClose} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ChamadoTechnicalInfo chamado={chamado} />
        <div className="lg:col-span-3 space-y-8">
          <ChamadoDescription descricao={chamado.descricao} />
          <ChamadoChat chamadoId={chamado.id.toString()} />
        </div>
      </div>
    </div>
  );
}

