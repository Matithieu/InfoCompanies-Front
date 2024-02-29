import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        placeholder="Rechercher une entreprise"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        endDecorator={<SearchIcon />}
      />
    </form>
  );
}
