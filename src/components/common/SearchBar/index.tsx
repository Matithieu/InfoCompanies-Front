import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/joy";

export default function SearchAppBar() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchTerm.trim() !== "") {
      console.log(`/search/${searchTerm}`);
      // Redirigez vers la page des résultats avec le terme de recherche
      navigate(`/search/${searchTerm}`, { state: { searchTerm } });
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <Input
        endDecorator={<SearchIcon />}
        placeholder="Rechercher une entreprise"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
