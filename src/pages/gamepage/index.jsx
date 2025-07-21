import { useEffect } from "react";
import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";

export default function GamePage() {
    const { id } = useParams();

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=a15a7b3ac6b541bdaf2e36ad79c7aeb4`;

    const { data, error, loading, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <>
            {error && <h1>{error}</h1>}
            <div className="style-gamepage">
                <div>
                    <ToggleFavorite />
                </div>
                <div className="style-game-info">
                    <p>{data && data.released}</p>
                    <h1>{data && data.name}</h1>
                    <p>Rating: {data && data.rating}</p>
                    <p>About:</p>
                    <p>{data && data.description_raw}</p>
                </div>
                <div className="style-game-image my-4">
                    <img src={data && data.background_image} alt="" />
                    {loading && <p>Loading...</p>}
                    {error && <p>Errore: {error}</p>}
                </div>
            </div>
        </>
    )
}