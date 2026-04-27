import { Box, Pagination, Typography } from "@mui/material";

type LaravelPagination = {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
};

type PaginacaoProps = {
    meta?: LaravelPagination;
    onPageChange: (page: number) => void;
    disabled?: boolean;
};

export function Paginacao({ meta, onPageChange, disabled = false }: PaginacaoProps) {
    if (!meta) return null;

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
            mt={3}
        >
            <Typography variant="body2" color="text.secondary">
                Mostrando {meta.from ?? 0} até {meta.to ?? 0} de {meta.total} registros
            </Typography>

            <Pagination
                count={meta.last_page}
                page={meta.current_page}
                onChange={(_, page) => onPageChange(page)}
                color="primary"
                shape="rounded"
                disabled={disabled || meta.last_page <= 1}
                showFirstButton
                showLastButton
            />
        </Box>
    );
}