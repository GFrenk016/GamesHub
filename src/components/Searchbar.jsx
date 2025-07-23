import { useState } from "react";
import { useNavigate } from "react-router";

export default function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ ariaInvalid, setAriaInvalid ] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === "string" && search.trim().length !== 0) {
            navigate(`/search?query=${search}`);
            setSearch("");
        } else {
            setAriaInvalid(true);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <fieldset role="group">
                <input
                    className="p-2 border border-white rounded-md"
                    type="text"
                    name="search"
                    placeholder={ariaInvalid ? "Inserisci qualcosa" : "Cerca un gioco"}
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                    aria-invalid={ariaInvalid}
                />
                <input className="hover:text-gray-400 transition mx-4 cursor-pointer" type="submit" value="Cerca" />
            </fieldset>
        </form>
    ); 
}