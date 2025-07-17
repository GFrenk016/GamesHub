import { useEffect } from 'react';
import { Link } from 'react-router';
import useFetchSolution from '../hook/useFetchSolution';

export default function GenresDropdown() {
    const initialUrl = 'https://api.rawg.io/api/genres?key=a15a7b3ac6b541bdaf2e36ad79c7aeb4'

    const { data: genres, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

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