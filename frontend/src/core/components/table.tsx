import { useState, type ReactNode } from "react";
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  ExternalLink 
} from "lucide-react";
import { 
  Menu, 
  MenuItem, 
  IconButton, 
  ListItemIcon, 
  ListItemText 
} from "@mui/material";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
  isActions?: boolean;
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


function ActionMenu<T>({ 
  item, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  item: T, 
  onView?: (item: T) => void, 
  onEdit?: (item: T) => void, 
  onDelete?: (item: T) => void 
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div className="flex justify-end px-2">
      <IconButton 
        onClick={handleOpen} 
        size="small" 
        className="hover:bg-blue-50 transition-colors"
      >
        <MoreVertical size={18} className="text-slate-400 group-hover:text-blue-900" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            elevation: 2,
            className: "mt-1 border border-slate-100 rounded-xl min-w-[160px]"
          }
        }}
      >
        {onView && (
          <MenuItem onClick={() => { onView(item); handleClose(); }}>
            <ListItemIcon><Eye size={16} className="text-blue-600" /></ListItemIcon>
            <ListItemText primary="Visualizar" primaryTypographyProps={{ className: "text-sm font-medium text-slate-700" }} />
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem onClick={() => { onEdit(item); handleClose(); }}>
            <ListItemIcon><Edit size={16} className="text-amber-500" /></ListItemIcon>
            <ListItemText primary="Editar" primaryTypographyProps={{ className: "text-sm font-medium text-slate-700" }} />
          </MenuItem>
        )}
        <div className="my-1 border-t border-slate-100" />
        {onDelete && (
          <MenuItem onClick={() => { onDelete(item); handleClose(); }} className="hover:bg-red-50">
            <ListItemIcon><Trash2 size={16} className="text-red-500" /></ListItemIcon>
            <ListItemText primary="Excluir" primaryTypographyProps={{ className: "text-sm font-bold text-red-500" }} />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export function Table<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  emptyMessage = "Nenhum registro encontrado.",
  onView,
  onEdit,
  onDelete,
  onRowClick
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Header */}
          <thead className="bg-slate-50/80 border-b border-slate-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-[11px] font-black uppercase tracking-widest text-blue-900/70 ${column.className}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              // Skeleton Loading
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <td key={j} className="px-6 py-5">
                      <div className="h-3 bg-slate-100 rounded-full w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((item) => (
                <tr 
                  key={item.id} 
                  className={`group hover:bg-blue-50/30 transition-all duration-200 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                >
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={`px-6 py-4 text-sm text-slate-600 font-medium ${column.className}`}
                    >
                      {/* Se for a coluna de ações, renderiza o menu, senão os dados normais */}
                      {column.isActions ? (
                        <ActionMenu 
                          item={item} 
                          onView={onView} 
                          onEdit={onEdit} 
                          onDelete={onDelete} 
                        />
                      ) : typeof column.accessor === "function" ? (
                        column.accessor(item)
                      ) : (
                        (item[column.accessor] as ReactNode)
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-20 text-center text-sm text-slate-400 font-medium italic"
                >
                  <div className="flex flex-col items-center gap-2">
                    <ExternalLink size={32} className="text-slate-200" />
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}