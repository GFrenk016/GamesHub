import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/Card";
import useFetchSolution from "../../hook/useFetchSolution";

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `https://api.rawg.io/api/games?key=a15a7b3ac6b541bdaf2e36ad79c7aeb4&search=${game}`;

    const { data, error, loading, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <div className="container mx-auto text-center mt-8">
            <h1 className="text-2xl font-bold mb-4">Ricerca per: {game}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {error && <p>{error}</p>}
                {data && data.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
                {loading && <p>Loading...</p>}
                {error && <p>Errore: {error}</p>}
            </div>
        </div>
    );
}