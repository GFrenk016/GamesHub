import { useEffect, useState } from 'react'
import { Link } from 'react-router';

export default function GenresDropdown() {
    const [genres, setGenres] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = 'https://api.rawg.io/api/genres?key=a15a7b3ac6b541bdaf2e36ad79c7aeb4'

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setGenres(json);
            } catch (error) {
            setError(error.message);
            setGenres(null);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <>
            <details className="dropdown">
                <summary>Genres</summary>
                {error && <small>{error}</small>}
                <ul>
                    {genres && genres.results.map((genre) => (
                        <li key={genre.id}>
                        <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                        </li>
                    ))}
                </ul>
            </details>
        </>
    )
}