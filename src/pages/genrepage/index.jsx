import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CardGame from "../../components/Card";

export default function GenrePage() {
    const { genre } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null); 

    const initialUrl = `https://api.rawg.io/api/games?key=a15a7b3ac6b541bdaf2e36ad79c7aeb4&genres=${genre}&page=1`;

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
            setData(null);
        }
    };

    useEffect(() => {
        load();
    }, [genre]);

    return (
        <>
            <h1>Genere {genre}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {error && <p>{error}</p>}
                {data && data.results.map((game) => <CardGame key={game.id} game={game} />)}
            </div>
        </>
    );
}