import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DataTable from "../../../components/common/data-table";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { fetchUsers } from "./userApi";
import { columns } from "./columns";

function ClientList() {
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

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

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const onEditUser = (row) => {
    navigate(`/agency/clients/edit/${row.id}`);
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center flex-col sm:flex-row sm:justify-between gap-3">
          <h2 className="text-xl">Clients</h2>
          <div className="flex gap-4">
            <InputGroup className="sm:max-w-80">
              <InputGroupInput
                value={search}
                placeholder="Search users..."
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
            <Button asChild>
              <Link to="/agency/clients/create" className="flex items-center gap-1">
                <Plus /> Create new
              </Link>
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns(handleSort, onEditUser)}
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
