import ChamadoHeader from "../components/ChamadoHeader";
import ChamadoTechnicalInfo from "../components/ChamadoTechnicalInfo";
import ChamadoDescription from "../components/ChamadoDescricao";
import ChamadoChat from "../components/ChamadoChat";
import { useAppSelector } from "../../../core/store/hooks";
import { selectUser } from "../../../core/store/selectors/authSelectors";
import { useChamado } from "../hooks/useChamados";
import Loading from "../../../core/components/loading";

interface ChamadoDetalhesProps {
  chamadoId: string;
  onClose: () => void;
  onRefresh?: () => void;
}

export default function ChamadoDetalhes({ chamadoId, onClose }: ChamadoDetalhesProps) {
  const usuario = useAppSelector(selectUser);
  const { data: chamado, isLoading } = useChamado(chamadoId);

  if (isLoading || !chamado) {
    return <Loading message="Carregando chamado..." />
  }

  return (
    <div className="space-y-6 font-sans pb-6">
      <ChamadoHeader usuario={usuario} chamado={chamado} onClose={onClose} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ChamadoTechnicalInfo chamado={chamado} />
        <div className="lg:col-span-3 space-y-8">
          <ChamadoDescription descricao={chamado.descricao} />
          <ChamadoChat usuario={usuario} chamado={chamado} />
        </div>
      </div>
    </div>
  );
}


