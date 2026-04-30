import { CalendarDays, Mail, CreditCard, Building, User, FileCheck, FileX } from "lucide-react";
import type { Assinatura } from "../types/Assinatura";
import { formatDateTimeFullBR } from "../../../core/utils";

interface AssinaturaDetalhesProps {
    assinatura: Assinatura;
    onClose: () => void;
}

export default function AssinaturaDetalhes({
    assinatura,
}: AssinaturaDetalhesProps) {
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <span className="font-mono text-sm bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        #{String(assinatura.id).padStart(3, "0")}
                    </span>
                </div>

                <h1 className="text-3xl font-extrabold text-slate-950 tracking-tighter leading-tight flex items-center gap-2">
                    <CreditCard size={28} />
                    Plano: {assinatura.plano}
                </h1>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                    <div className="space-y-3">
                        <p className="flex items-center gap-2">
                            <Mail size={16} className="text-slate-400" />
                            <span className="font-semibold">Email:</span> {assinatura.email_cliente}
                        </p>
                        <p className="flex items-center gap-2">
                            <User size={16} className="text-slate-400" />
                            <span className="font-semibold">Documento Cliente:</span> {assinatura.numeroDocumentoCliente}
                        </p>
                        <p className="flex items-center gap-2">
                            {assinatura.foiEnviadoDocumentos ? (
                                <FileCheck size={16} className="text-green-500" />
                            ) : (
                                <FileX size={16} className="text-red-500" />
                            )}
                            <span className="font-semibold">Documentos Enviados:</span> {assinatura.foiEnviadoDocumentos ? "Sim" : "Não"}
                        </p>
                    </div>
                    <div className="space-y-3">
                        <p className="flex items-center gap-2">
                            <Building size={16} className="text-slate-400" />
                            <span className="font-semibold">Empresa ID:</span> {assinatura.empresa_id}
                        </p>
                        <p className="flex items-center gap-2">
                            <User size={16} className="text-slate-400" />
                            <span className="font-semibold">Cliente ID:</span> {assinatura.cliente_id}
                        </p>
                        <p className="flex items-center gap-2">
                            <CalendarDays size={16} className="text-slate-400" />
                            <span className="font-semibold">Criado em:</span> {formatDateTimeFullBR(assinatura.created_at)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}