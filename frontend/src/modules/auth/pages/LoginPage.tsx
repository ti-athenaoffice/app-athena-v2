import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LogIn, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../../../core/components/input";
import Button from "../../../core/components/button";
import type { Login } from "../types/Login";
import { useAppDispatch, useAppSelector } from "../../../core/store/hooks";
import { login } from "../../../core/store/slices/authSlice";
import { selectIsLoading } from "../../../core/store/selectors/authSelectors";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: Login) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate("/dashboard");
      toast.success("Bem-vindo ao App Athena!");
    } catch (err: any) {
      toast.error(
          err.message ||
          "Falha no login. Verifique suas credenciais e tente novamente."
      );
    }
  };

  return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4 font-sans">
        <div className="w-full max-w-[420px]">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 px-8 py-10 space-y-8 mt-10">
            <div className="text-center space-y-4">
              <img
                  src="/logo-athena.png"
                  alt="Athena Office"
                  className="mx-auto w-56 object-contain"
              />

              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-slate-900">
                  Acesse sua conta
                </h1>

                <p className="text-sm text-slate-500">
                  Entre com suas credenciais institucionais para continuar.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-600">
              <ShieldCheck size={18} className="text-slate-700" />
              <span>Ambiente seguro e restrito à equipe Athena.</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                  label="E-mail institucional"
                  type="email"
                  placeholder="seuemail@athenaoffice.com.br"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
              />

              <Input
                  label="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  {...register("senha")}
                  error={!!errors.senha}
                  helperText={errors.senha?.message}
                  fullWidth
              />

              <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  isLoading={isLoading}
                  startIcon={!isLoading && <LogIn size={20} />}
              >
                Entrar no sistema
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Athena Office. Uso interno.
          </p>
        </div>
      </div>
  );
}