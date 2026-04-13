import { useState, type ReactNode, type MouseEvent } from "react";
import { MoreHorizontal, Eye, Edit3, Trash2 } from "lucide-react";
import {
  Paper,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Skeleton,
  alpha,
  useTheme,
  Divider,
} from "@mui/material";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  isActions?: boolean;
  align?: "left" | "center" | "right";
  width?: string | number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onRowClick?: (item: T) => void;
}

/**
 * Menu de Ações Estilizado
 */
function ActionMenu<T>({ item, onView, onEdit, onDelete }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleAction = (e: MouseEvent, action: (item: T) => void) => {
    e.stopPropagation();
    action(item);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton 
        onClick={handleOpen} 
        size="small"
        sx={{ 
          color: theme.palette.text.secondary,
          "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.08) }
        }}
      >
        <MoreHorizontal size={20} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        elevation={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              minWidth: 160,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
              mt: 0.5,
            }
          }
        }}
      >
        {onView && (
          <MenuItem onClick={(e) => handleAction(e, onView)}>
            <ListItemIcon><Eye size={18} color={theme.palette.text.secondary} /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: "body2", fontWeight: 500 }}>Visualizar</ListItemText>
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem onClick={(e) => handleAction(e, onEdit)}>
            <ListItemIcon><Edit3 size={18} color={theme.palette.text.secondary} /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: "body2", fontWeight: 500 }}>Editar</ListItemText>
          </MenuItem>
        )}
        {onDelete && (
          <Box mt={0.5}>
            <Divider />
            <MenuItem onClick={(e) => handleAction(e, onDelete)} sx={{ color: theme.palette.error.main }}>
              <ListItemIcon><Trash2 size={18} color={theme.palette.error.main} /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2", fontWeight: 600 }}>Excluir</ListItemText>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
}

export function Table<T extends { id: string | number }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "Nenhum registro encontrado.",
  onView,
  onEdit,
  onDelete,
  onRowClick,
}: DataTableProps<T>) {
  const theme = useTheme();

  return (
    <TableContainer 
      component={Paper} 
      elevation={0}
      sx={{ 
        borderRadius: "16px", 
        border: `1px solid ${theme.palette.divider}`,
        overflow: "hidden"
      }}
    >
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: alpha(theme.palette.text.primary, 0.02) }}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align || "left"}
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  py: 2,
                  width: column.width
                }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading ? (
            [...Array(5)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex} sx={{ py: 2.5 }}>
                    <Skeleton variant="rounded" height={20} width={colIndex === 0 ? "40%" : "80%"} sx={{ borderRadius: "4px" }} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map((item) => (
              <TableRow
                key={item.id}
                hover
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                sx={{
                  cursor: onRowClick ? "pointer" : "default",
                  transition: "background-color 0.2s ease",
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: `${alpha(theme.palette.primary.main, 0.02)} !important`,
                  },
                }}
              >
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align || "left"}
                    sx={{ py: 2, color: theme.palette.text.primary, fontSize: "0.875rem" }}
                  >
                    {column.isActions ? (
                      <Box display="flex" justifyContent={column.align === "center" ? "center" : "flex-end"}>
                        <ActionMenu
                          item={item}
                          onView={onView}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </Box>
                    ) : typeof column.accessor === "function" ? (
                      column.accessor(item)
                    ) : (
                      <Typography variant="body2" fontWeight={500}>
                        {String(item[column.accessor])}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Box py={8} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                  <Typography variant="body1" fontWeight={600} color="text.secondary">
                    {emptyMessage}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    Tente ajustar seus filtros ou termos de busca.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}