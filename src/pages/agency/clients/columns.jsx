import { ArrowUpDown, Trash2, Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns = (handleSort, onEditUser, onDeleteUser) => [
  {
    accessorKey: "name",
    header: () => (
      <span
        className="flex items-center hover:cursor-pointer"
        onClick={() => handleSort("name")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <span
        className="flex items-center hover:cursor-pointer"
        onClick={() => handleSort("email")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger>
            <Pencil
              size="18"
              className="hover:cursor-pointer text-green-500"
              onClick={() => onEditUser(row.original)}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Edit employee</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Trash2
              size="18"
              className="text-red-500 hover:cursor-pointer"
              onClick={() => onDeleteUser(row.original)}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Delete employee</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
];
