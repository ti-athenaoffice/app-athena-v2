import Select from "../../../core/components/select.tsx";
import {getStatusOptions} from "../utils/options.ts";
import TextArea from "../../../core/components/textArea.tsx";
import Button from "../../../core/components/button.tsx";
import {useForm, Controller} from "react-hook-form";
import type {FaleConosco} from "../types/FaleConosco.ts";

interface FaleConoscoAtualizarStatusProps {
    contato: any;
    setIsEditModalOpen: (open: boolean) => void;
    onUpdate?: (data: any) => void;
}

export default function FaleConoscoAtualizarStatus({
                                            contato,
                                            setIsEditModalOpen,
                                            onUpdate,
                                           }: FaleConoscoAtualizarStatusProps) {
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<FaleConosco>({
        defaultValues: {
            status: contato?.status || "",
            observacoes: contato?.observacoes || "",
        }
    });

    const onSubmit = (data: FaleConosco) => {
        onUpdate?.({
            id: contato.id,
            ...data,
        });

        setIsEditModalOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-6 border-b pb-4">
                <h3 className="text-lg font-bold text-slate-800">
                    Editar Contato
                </h3>
                <p className="text-sm text-slate-500">
                    Atualize o status e adicione observações internas.
                </p>
            </div>

            <div className="space-y-5">
                <div>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Status"
                                options={getStatusOptions()}
                                error={!!errors.status}
                                helperText={errors.status?.message}
                            />
                        )}
                    />
                </div>

                <div>
                    <Controller
                        name="observacoes"
                        control={control}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                label="Observações"
                                placeholder="Digite uma observação sobre este contato..."
                                error={!!errors.observacoes}
                                helperText={errors.observacoes?.message}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
                <Button
                    variant="outlined"
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    type="submit">
                    Salvar alterações
                </Button>
            </div>
        </form>
    );
}