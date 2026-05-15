import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

const SearchInput = ({ search, setSearch }) => {
  return (
    <InputGroup className="sm:max-w-80">
      <InputGroupInput
        value={search}
        placeholder="Search Projects..."
        autoComplete="off"
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;
