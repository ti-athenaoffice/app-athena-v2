import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Input from "../../../core/components/input";
import Select from "../../../core/components/select";
import Button from "../../../core/components/button";
import { Save, AlertCircle, ArrowLeft } from "lucide-react";
import QuillEditor from "../../../core/components/quillEditor";
import AutoSelect from "../../../core/components/autoSelect";
import {
  getSetoresOptions,
  getPrioridadesOptions,
} from "../../../core/utils/selectOptions";
import toast from "react-hot-toast";
import { defaultValuesChamado, type Chamado } from "../types/Chamado";
import { useCreateChamado, useUpdateChamado } from "../hooks/useChamados";
import { useUsuarios } from "../../admin/hooks/useUsuario";

export default function ChamadosForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { mutateAsync: createChamado, isPending: createLoading } = useCreateChamado();
  const { mutateAsync: editarChamado, isPending: updateLoading  } = useUpdateChamado();
  const { data, isFetching } = useUsuarios();
  const usuarios = data ? data?.data?.map((u) => ({ value: u.nome, label: u.nome })) : [];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Chamado>({
    defaultValues: defaultValuesChamado,
  });

  useEffect(() => {
    if (id && location.state?.chamado) {
      const data = location.state.chamado;
      reset({
        id: data.id,
        titulo: data.titulo,
        setor_solicitado: data.setor_solicitado,
        prioridade: data.prioridade,
        descricao: data.descricao || "",
        nome_funcionario_requisitado: data.nome_funcionario_requisitado,
      });
    }
  }, [id, reset, location.state]);

  const onSubmit = async (data: Chamado) => {
    try {
      if (id) {
        await editarChamado({ id, data });
        toast.success("Chamado atualizado com sucesso!");
      } else {
        await createChamado(data);
        toast.success("Chamado aberto com sucesso!");
      }
      navigate("/chamados");
    } catch (error) {
      toast.error("Erro ao salvar o chamado");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outlined"
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
              <Controller
                name="setor_solicitado"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Setor Solicitado *"
                    options={getSetoresOptions()}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    error={!!errors.setor_solicitado}
                    helperText={errors.setor_solicitado?.message}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name="prioridade"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Prioridade *"
                    options={getPrioridadesOptions()}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.prioridade}
                    helperText={errors.prioridade?.message}
                  />
                )}
              />
            </div>

            <div className="md:col-span-2">
              <Controller
                  name="nome_funcionario_requisitado"
                  control={control}
                  render={({ field }) => {
                    const selectedOption =
                        usuarios.find((opt) => opt.value === field.value) ?? null;

                    return (
                        <AutoSelect
                            label="Nome funcionário Requisitado"
                            options={usuarios}
                            value={selectedOption}
                            disabled={isFetching}
                            loading={isFetching}
                            onChange={(_, option) =>
                                field.onChange(option?.value ?? "")
                            }
                            error={!!errors.nome_funcionario_requisitado}
                            helperText={errors.nome_funcionario_requisitado?.message}
                        />
                    );
                  }}
              />
            </div>

            <div className="md:col-span-2">
              <Controller
                name="descricao"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    label="Descrição Detalhada *"
                    value={field.value ?? ""}
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
                isLoading={createLoading || updateLoading}
                startIcon={<Save size={18} />}
              >
                {id ? "Salvar Alterações" : "Abrir Chamado"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
