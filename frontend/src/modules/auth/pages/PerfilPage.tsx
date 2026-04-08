import { useForm } from "react-hook-form";
import { User, Image as ImageIcon, Save } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../../core/components/input";
import Button from "../../../core/components/button";
import { useAppSelector } from "../../../core/store/hooks";
import { selectUser } from "../../../core/store/selectors/authSelectors";

interface PerfilFormData {
  nome: string;
  email: string;
}

export default function PerfilPage() {
  const user = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PerfilFormData>({
    defaultValues: {
      nome: user?.nome || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: PerfilFormData) => {
    try {
      console.log("Dados atualizados:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Perfil atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar perfil.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 font-sans">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 text-white">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Meu Perfil</h1>
          <p className="text-slate-500">Gerencie suas informações pessoais e configurações de conta.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="relative mx-auto w-32 h-32 mb-4">
              <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border-4 border-white shadow-inner">
                <ImageIcon size={48} />
              </div>
              <div 
                className="absolute bottom-0 right-0 p-2 bg-slate-200 rounded-full text-slate-600 cursor-not-allowed"
                title="Upload desativado"
              >
                <ImageIcon size={16} />
              </div>
            </div>
            <h2 className="font-bold text-slate-800">{user?.nome || "Usuário"}</h2>
            <p className="text-xs text-slate-500 uppercase font-black tracking-widest mt-1">
              Setor: {user?.setor || "Não informado"}
            </p>
          </div>
        </div>

        {/* Coluna da Direita: Formulário e Ações Críticas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Formulário de Dados */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Informações Básicas</h3>
              
              <Input
                label="Nome Completo"
                placeholder="Seu nome"
                {...register("nome", { required: "Nome é obrigatório" })}
                error={!!errors.nome}
                helperText={errors.nome?.message}
                fullWidth
              />

              <Input
                label="E-mail Institucional"
                type="email"
                placeholder="exemplo@athena.com"
                {...register("email", { required: "E-mail é obrigatório" })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  variant="contained"
                  isLoading={isSubmitting}
                  startIcon={<Save size={20} />}
                >
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}