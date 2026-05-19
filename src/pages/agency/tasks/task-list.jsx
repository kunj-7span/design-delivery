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
import {
    SquarePen,
    ArrowUpDown,
    Trash2,
    Plus,
    View,
    SquareChartGantt,
    ClipboardClock,
    FileXCorner,
    CalendarCheck2
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchTasks } from "./taskApi";
import SearchInput from "../../../components/common/search-input";
import {
    Card,
    CardHeader,
    CardTitle,
    CardAction
} from "@/components/ui/card"

const statusColor = {
    "Completed": "bg-green-100 text-green-700",
    "In Progress": "bg-blue-100 text-blue-700",
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
        accessorKey: "assignedTo",
        header: () => (
            <span
                className="flex items-center hover:cursor-pointer"
                onClick={() => handleSort("assignedTo")}
            >
                Employee Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </span>
        ),
    },
    {
        accessorKey: "version",
        header: () => (
            <span
                className="flex items-center hover:cursor-pointer"
                onClick={() => handleSort("version")}
            >
                Latest Version
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </span>
        ),
        cell: ({ row }) => {
            const version = row.getValue("version") || 0;
            return <Badge variant="outline">v{version}</Badge>;
        },
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
                            onClick={() => onEditProject(row.original.id)}
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
                                    <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete this Task.
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

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("")

    const [sortBy, setSortBy] = useState("");

    const [order, setOrder] = useState("asc");

    const [loading, setLoading] = useState(false);

    const [statusFilter, setStatusFilter] = useState("");

    const navigate = useNavigate();
    const { pid } = useParams();

    const handleSort = (field) => {
        if (sortBy === field) {
            setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(field);
            setOrder("asc");
        }
    };

    const onEditProject = (id) => {
        navigate(`/agency/projects/${pid}/tasks/${id}`);
    };

    useEffect(() => {
        const getTasks = async () => {
            try {
                setLoading(true);

                const response = await fetchTasks({
                    page,
                    limit: 10,
                    search,
                    status: statusFilter,
                    sortBy,
                    order,
                });

                setTasks(response.data);

                setTotalPages(response.totalPages);
            } finally {
                setLoading(false);
            }
        };
        getTasks();
    }, [page, search, sortBy, order, statusFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
            setSearch(searchText)
        }, 400);
        return () => clearTimeout(timer)
    }, [searchText]);


    const states = [
        {
            id: 1,
            name: "Total Tasks",
            count: 10,
            icon: <SquareChartGantt size="25" />,
            bg: "bg-purple-100",
            text: "text-purple-700",
        },
        {
            id: 2,
            name: "Total Completed Tasks",
            count: 7,
            icon: <CalendarCheck2 size="25" />,
            bg: "bg-emerald-100",
            text: "text-emerald-700",
        },
        {
            id: 3,
            name: "Total In Review Assets",
            count: 23,
            icon: <ClipboardClock size="25" />,
            bg: "bg-orange-100",
            text: "text-orange-700",
        },
        {
            id: 4,
            name: "Total Rejected Assets",
            count: 6,
            icon: <FileXCorner size="25" />,
            bg: "bg-red-100",
            text: "text-red-700",
        },
    ];

    return (
        <div className="space-y-4">

            <h2 className="text-xl font-semibold">TechCrop Rebrand</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {states.map((item) => (
                    <Card key={item.id}>
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle>
                                <div className={`p-3 rounded-lg inline-flex ${item.bg}`}>
                                    {item.icon}
                                </div>
                            </CardTitle>
                            <CardAction className="text-end">
                                <span className={`text-2xl font-semibold ${item.text}`}>
                                    {item.count}
                                </span>
                                <p className="font-semibold">{item.name}</p>
                            </CardAction>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <div className="flex items-center flex-col sm:flex-row sm:justify-between gap-3">

                <h2 className="text-lg">Tasks</h2>

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
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button asChild>
                        <Link
                            to={`/agency/projects/${pid}/tasks/+`}
                            className="flex items-center gap-1"
                        >
                            <Plus /> Create new
                        </Link>
                    </Button>
                </div>
            </div>
            <DataTable
                columns={columns(handleSort, onEditProject,)}
                data={tasks}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                isLoading={loading}
            />
        </div>
    );
};

export default TaskList;
