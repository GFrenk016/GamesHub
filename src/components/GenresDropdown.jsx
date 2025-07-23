import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchSolution from '../hook/useFetchSolution';

export default function GenresDropdown() {
    const initialUrl = 'https://api.rawg.io/api/genres?key=a15a7b3ac6b541bdaf2e36ad79c7aeb4';
    const [isOpen, setIsOpen] = useState(false);
    const { data: genres, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <div
        className="dropdown-container"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        >
        <span className="dropdown-trigger">
            Generi
        </span>

        <ul
            className={`dropdown-menu ${
            isOpen ? 'show' : ''
            }`}
        >
            {genres?.results.map((genre) => (
            <li key={genre.id}>
                <Link
                to={`/games/${genre.slug}`}
                className="dropdown-item"
                >
                {genre.name}
                </Link>
            </li>
            ))}
        </ul>
        </div>
    );
}
