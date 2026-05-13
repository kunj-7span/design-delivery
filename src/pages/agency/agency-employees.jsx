import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import DataTable from "../../components/common/data-table";
import { empFormSchema } from "../../schema/agency-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Mail,
  UserRound,
  IdCardLanyard,
  ArrowUpDown,
  Trash2,
  Pencil,
  Search,
} from "lucide-react";
import { fetchEmployees } from "./empApi";
import { useEffect, useState } from "react";

const columns = (handleSort, onViewUser, onDeleteUser) => [
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
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Pencil
          size="20"
          className="hover:cursor-pointer hover:text-blue-500"
          onClick={() => onViewUser(row.original)}
        />
        <Trash2
          size="20"
          className="hover:text-red-500 hover:cursor-pointer"
          onClick={() => onDeleteUser(row.original)}
        />
      </div>
    ),
  },
];

function AgencyEmployees() {
  const [emp, setEmp] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("name");

  const [order, setOrder] = useState("asc");

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(empFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const getEmp = async () => {
    try {
      setLoading(true);

      const response = await fetchEmployees({
        page,
        limit: 10,
        search,
        sortBy,
        order,
      });

      setEmp(response.data);

      setTotalPages(response.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  useEffect(() => {
    getEmp();
  }, [page, search, sortBy, order]);

  function onSubmit(data) {
    toast.success("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
        background: "",
      },
    });
  }

  return (
    <div>
      <h2 className="text-xl font-medium">Employees</h2>
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="text-lg flex gap-3">
            <IdCardLanyard />
            Add Employees
          </CardTitle>
          <CardDescription>
            Enter your employees to assign tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-emp"
            className="grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-emp-name">Name</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="form-emp-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Name"
                        autoComplete="off"
                        type="text"
                      />
                      <InputGroupAddon>
                        <UserRound />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-emp-email">Email</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="form-emp-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter email"
                        autoComplete="off"
                        type="email"
                      />
                      <InputGroupAddon>
                        <Mail />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="">
          <Button form="form-emp" className="w-full md:w-50">
            Add Employee
          </Button>
        </CardFooter>
      </Card>
      <div className="space-y-4 mt-8">
        <div className="flex items-center flex-col sm:flex-row sm:justify-between gap-3">
          <h3 className="text-lg">Employees</h3>
          <InputGroup className="sm:max-w-80">
            <InputGroupInput
              value={search}
              placeholder="Search Employees..."
              autoComplete="off"
              type="text"
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <DataTable
          columns={columns(handleSort)}
          data={emp}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={loading}
        />
      </div>
    </div>
  );
}

export default AgencyEmployees;
