import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import Input from "../../../core/components/input";
import Select from "../../../core/components/select";
import Button from "../../../core/components/button";
import { Save, AlertCircle, ArrowLeft } from "lucide-react";
import QuillEditor from "../../../core/components/quillEditor";
import AutoSelect from "../../../core/components/autoSelect";
import { getSetoresOptions, getPrioridadesOptions } from "../../../core/utils/selectOptions";
import { criarChamado } from "../service/chamadoService";

const chamadoSchema = z.object({
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  setor_solicitado: z.string().min(1, "Selecione o setor de destino"),
  prioridade: z.string().min(1, "Defina a prioridade"),
  descricao: z.string().min(10, "Descreva o problema com mais detalhes"),
  nome_funcionario_requisitado: z.string().optional(),
});

type ChamadoFormData = z.infer<typeof chamadoSchema>;

export default function ChamadosForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ChamadoFormData>({
    resolver: zodResolver(chamadoSchema),
    defaultValues: {
      prioridade: "MEDIA",
      descricao: "",
    },
  });

  const onSubmit = async (data: ChamadoFormData) => {
    await criarChamado(data);
    navigate("/chamados");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          onClick={() => navigate("/chamados")}
          startIcon={<ArrowLeft size={20} />}
        >
          Voltar para Chamados
        </Button>
      </div>

      <div className="w-full max-w-4xl mx-auto overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Título do Chamado *"
                placeholder="Ex: Erro ao gerar nota fiscal"
                {...register("titulo")}
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />
            </div>

            <div>
              <Select
                label="Setor Solicitado *"
                options={getSetoresOptions()}
                {...register("setor_solicitado")}
                error={!!errors.setor_solicitado}
                helperText={errors.setor_solicitado?.message}
              />
            </div>

            <div>
              <Select
                label="Prioridade *"
                options={getPrioridadesOptions()}
                {...register("prioridade")}
                error={!!errors.prioridade}
                helperText={errors.prioridade?.message}
              />
            </div>

            <div className="md:col-span-2">
              <AutoSelect
                label="Nome funcionário Requisitado"
                options={[
                  { value: "Guilherme", label: "Guilherme" },
                  { value: "Gustavo", label: "Gustavo" },
                  { value: "Breno", label: "Breno" },
                  { value: "Gabriel", label: "Gabriel" },
                ]}
                {...register("nome_funcionario_requisitado")}
                error={!!errors.nome_funcionario_requisitado}
                helperText={errors.nome_funcionario_requisitado?.message}
              />
            </div>

            <div className="md:col-span-2">
              <Controller
                name="descricao"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    label="Descrição Detalhada *"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-amber-600 italic text-[11px]">
              <AlertCircle size={14} />
              Este chamado será vinculado ao seu setor de origem.
            </div>

            <div className="flex gap-3 my-3">
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate("/chamados")}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                isLoading={isSubmitting}
                startIcon={<Save size={18} />}
              >
                Abrir Chamado
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
