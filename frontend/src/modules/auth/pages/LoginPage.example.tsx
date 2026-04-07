import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LogIn, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../../core/components/input";
import Button from "../../../core/components/button";
import type { Login } from "../types/Login";
import { useAppDispatch, useAppSelector } from "../../../core/store/hooks";
import { login } from "../../../core/store/slices/authSlice";
import { selectError, selectIsLoading } from "../../../core/store/selectors/authSelectors";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      email: "",
      senha: ""
    }
  });

  const onSubmit = async (data: Login) => {
    try {
      const result = await dispatch(login(data)).unwrap();
      navigate("/dashboard");
      toast.success("Bem-vindo ao App Athena!");
    } catch (err) {
      toast.error(error || "Falha no login. Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-[440px] space-y-8">
        
        {/* Logo e Boas-vindas */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 mb-6">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">App Athena</h1>
        </div>

        {/* Card do Formulário */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="E-mail Institucional"
              type="email"
              placeholder="exemplo@athena.com"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message || error}
              fullWidth
            />

            <div className="space-y-1">
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                {...register("senha")}
                error={!!errors.senha}
                helperText={errors.senha?.message}
                fullWidth
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              isLoading={isLoading}
              startIcon={!isLoading && <LogIn size={20} />}
            >
              Entrar no Sistema
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
