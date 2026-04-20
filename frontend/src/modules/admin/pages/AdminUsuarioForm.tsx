import { ArrowLeft, Save } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Button from "../../../core/components/button";
import Input from "../../../core/components/input";
import { getSetoresOptions } from "../../../core/utils/selectOptions";
import toast from "react-hot-toast";
import Select from "../../../core/components/select";
import { Checkbox } from "../../../core/components/checkbox";
import { useCreateUsuario, useUpdateUsuario } from "../hooks/useUsuario";
import { useEffect } from "react";
import type { Usuario } from "../../auth/types/Usuario";

interface FuncionarioFormData extends Usuario {
  confirmarSenha?: string;
  setores_permitidos: string[];
}

export default function AdminUsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const opcoesSetores = getSetoresOptions();
  const { mutateAsync: criarUsuario, isPending: isPendingCreate } =
    useCreateUsuario();
  const { mutateAsync: editarUsuario, isPending: isPendingUpdate } =
    useUpdateUsuario();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FuncionarioFormData>({
    defaultValues: {
      id: undefined,
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      setor: undefined,
      setores_permitidos: [],
    },
  });

  useEffect(() => {
    if (id && location.state?.usuario) {
      const data = location.state.usuario;
      reset({
        id: data.id,
        nome: data.nome,
        email: data.email,
        setor: data.setor,
        setores_permitidos: data.setores_permitidos || "",
      });
    }
  }, [id, reset, location?.state]);

  const senhaValue = watch("senha");
  const onSubmit = async (data: FuncionarioFormData) => {
    const { confirmarSenha, ...dadosParaEnviar } = data;
    if (id) {
      await editarUsuario(
        { id: id.toString(), data: dadosParaEnviar },
        {
          onSuccess() {
            toast.success("Usuário atualizado com sucesso.");
            navigate("/admin");
          },
          onError(err: any) {
            toast.error(err.message);
          },
        },
      );
    } else {
      await criarUsuario(dadosParaEnviar, {
        onSuccess() {
          toast.success("Usuário criado com sucesso.");
          navigate("/admin");
        },
        onError(err: any) {
          toast.error(err.message);
        },
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="text"
          onClick={() => navigate("/admin")}
          startIcon={<ArrowLeft size={20} />}
        >
          Voltar para Admin
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit as any)}
        className="w-full max-w-4xl mx-auto overflow-hidden p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DADOS BÁSICOS */}
          <div className="md:col-span-2">
            <Input
              label="Nome Completo *"
              placeholder="Ex: Luís Gabriel"
              {...register("nome", { required: "Nome é obrigatório" })}
              error={!!errors.nome}
              helperText={errors.nome?.message}
              fullWidth
            />
          </div>

          <Input
            label="Email Corporativo *"
            type="email"
            placeholder="luis.gabriel@athena.com"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <div className="mt-[-7px]">
            <Controller
              name="setor"
              control={control}
              rules={{ required: "Selecione o setor principal" }}
              render={({ field }) => (
                <Select
                  label="Setor Principal *"
                  options={opcoesSetores}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={!!errors.setor}
                  helperText={errors.setor?.message}
                />
              )}
            />
          </div>

          {/* SENHAS */}
          <Input
            label={id ? "Alterar Senha" : "Senha *"}
            type="password"
            {...register("senha", {
              required: !id ? "Senha é obrigatória" : false,
              validate: (value) => {
                if (!value) return true;
                if (value.length < 6) return "Mínimo 6 caracteres";
                return true;
              },
            })}
            error={!!errors.senha}
            helperText={errors.senha?.message}
            fullWidth
          />

          <Input
            label="Confirmar Senha *"
            type="password"
            {...register("confirmarSenha", {
              validate: (val) => {
                if (!senhaValue) return true;
                if (!val) return "Confirme a senha";
                if (val !== senhaValue) return "As senhas não conferem";
                return true;
              },
            })}
            error={!!errors.confirmarSenha}
            helperText={errors.confirmarSenha?.message}
            fullWidth
          />

          {/* SEÇÃO DE CHECKBOXES (PERMISSÕES) */}
          <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Permissões de Acesso
              </h3>
              <p className="text-xs text-slate-500">
                Selecione quais setores este usuário poderá visualizar e
                gerenciar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
              {opcoesSetores.map((opcao) => (
                <Controller
                  key={opcao.value}
                  name="setores_permitidos"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      label={opcao.label}
                      checked={field.value?.includes(opcao.value)}
                      onChange={(e) => {
                        const valorAtual = field.value || [];
                        const novosValores = e.target.checked
                          ? [...valorAtual, opcao.value]
                          : valorAtual.filter((v) => v !== opcao.value);
                        field.onChange(novosValores);
                      }}
                    />
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* AÇÕES */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate("/admin")}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            isLoading={isPendingCreate || isPendingUpdate}
            startIcon={<Save size={18} />}
          >
            {id ? "Salvar Alterações" : "Criar Usuário"}
          </Button>
        </div>
      </form>
    </>
  );
}
