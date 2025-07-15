import { Link } from 'react-router';
import LazyLoadGameImage from "./LazyLoadGameImage";

export default function CardGame({ game }) {

    const genres = game.genres.map((genre) => genre.name).join(', ');

    const { background_image:  image } = game;

    return (
        <article key={game.id}>
            <LazyLoadGameImage image={image} />
            <h2>{game.name}</h2>
            <small>{genres}</small>
            <p>{game.released}</p>
            <Link to={`/games/${game.slug}/${game.id}`}>
                <button>Scopri di più</button>
            </Link>
        </article>
    );
}