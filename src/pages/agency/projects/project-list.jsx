import DataTable from "../../../components/common/data-table";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { SquarePen, ArrowUpDown, Trash2, Plus, View } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { fetchProjects } from "./projectApi";
import SearchInput from "../../../components/common/search-input";

const statusColor = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Draft: "bg-gray-100 text-gray-700",
};

const columns = (handleSort, onEditProject, onDeleteProject, onViewProject) => [
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
    accessorKey: "clientName",
    header: () => (
      <span
        className="flex items-center hover:cursor-pointer"
        onClick={() => handleSort("clientName")}
      >
        Client Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="flex items-center hover:cursor-pointer">Status</span>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return <Badge className={statusColor[status]}>{status}</Badge>;
    },
  },
  {
    accessorKey: "tasks",
    header: () => (
      <span className="flex items-center hover:cursor-pointer">
        Total Tasks
      </span>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger>
            <View
              size="18"
              className="hover:cursor-pointer text-blue-500"
              onClick={() => onViewProject(row.original)}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>View {row.original.name}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <SquarePen
              size="18"
              className="hover:cursor-pointer text-green-500"
              onClick={() => onEditProject(row.original)}
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
                  <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this Project.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => onDeleteProject(row.original)}
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

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const [sortBy, setSortBy] = useState("");

  const [order, setOrder] = useState("asc");

  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const onEditProject = (row) => {
    navigate(`/agency/projects/${row.id}`);
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);

        const response = await fetchProjects({
          page,
          limit: 10,
          search,
          status: statusFilter,
          sortBy,
          order,
        });

        setProjects(response.data);

        setTotalPages(response.totalPages);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, [page, search, sortBy, order, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchText);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className="space-y-4">
      <div className="flex items-center flex-col sm:flex-row sm:justify-between gap-3">
        <h2 className="text-xl font-medium">Projects</h2>
        <div className="flex gap-4 items-center">
          <SearchInput search={searchText} setSearch={setSearchText} />

          <Select
            onValueChange={(value) => {
              setPage(1);
              setStatusFilter(value);
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button asChild>
            <Link to="/agency/projects/+" className="flex items-center gap-1">
              <Plus /> Create new
            </Link>
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns(handleSort, onEditProject)}
        data={projects}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={loading}
      />
    </div>
  );
};

export default ProjectsList;
