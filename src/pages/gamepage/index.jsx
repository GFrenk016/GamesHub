import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function GamePage() {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=a15a7b3ac6b541bdaf2e36ad79c7aeb4`;

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
    }, [id]);

    return (
        <>
            {error && <h1>{error}</h1>}
            <div className="style-gamepage">
                <div className="style-game-info">
                    <p>{data && data.released}</p>
                    <h1>{data && data.name}</h1>
                    <p>Rating: {data && data.rating}</p>
                    <p>About:</p>
                    <p>{data && data.description_raw}</p>
                </div>
                <div className="style-game-image my-4">
                    <img src={data && data.background_image} alt="" />
                </div>
            </div>
        </>
    )
}