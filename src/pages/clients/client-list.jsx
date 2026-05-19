import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import DataTable from "../../../components/common/data-table";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowUpDown, SquarePen, Trash2 } from "lucide-react";
import { fetchUsers } from "./userApi";
import SearchInput from "../../../components/common/search-input";

const columns = (handleSort, onEditClient, onDeleteClient) => [
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
    cell: ({ row }) => (
      <span>
        {parsePhoneNumberFromString(
          row.original.phone,
          "IN",
        )?.formatInternational()}
      </span>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger>
            <SquarePen
              size="18"
              className="hover:cursor-pointer text-green-500"
              onClick={() => onEditClient(row.original)}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Edit {row.original.name}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2
                  size="18"
                  className="text-red-500 hover:cursor-pointer"
                />
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                    <Trash2 />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Delete Employee?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this Employee.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => onDeleteClient(row.original)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Delete {row.original.name}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
];

function ClientList() {
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const [sortBy, setSortBy] = useState("name");

  const [order, setOrder] = useState("asc");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await fetchUsers({
        page,
        limit: 10,
        search,
        sortBy,
        order,
      });

      setUsers(response.data);

      setTotalPages(response.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [page, search, sortBy, order]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchText);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const onEditClient = (row) => {
    navigate(`/agency/clients/${row.id}`);
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center flex-col sm:flex-row sm:justify-between gap-3">
          <h2 className="text-xl font-medium">Clients</h2>
          <div className="flex gap-4 items-center">
            <SearchInput search={searchText} setSearch={setSearchText} />
            <Button asChild>
              <Link
                to={`/agency/clients/+`}
                className="flex items-center gap-1"
              >
                <Plus /> Create new
              </Link>
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns(handleSort, onEditClient)}
          data={users}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={loading}
        />
      </div>
    </div>
  );
}

export default ClientList;
