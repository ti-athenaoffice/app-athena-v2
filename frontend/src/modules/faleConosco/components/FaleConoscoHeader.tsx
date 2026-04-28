import {Speech} from "lucide-react";

export default function FaleConoscoHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-2">
                    <Speech className="h-6 w-6 text-blue-900" />

                    <h1 className="text-2xl font-bold text-slate-800">
                        Fale Conosco
                    </h1>
                </div>

                <p className="mt-1 text-sm font-medium text-slate-500">
                    Gerenciamento de solicitações dos clientes
                </p>
            </div>
        </div>
    )
}