export default function CardGame({ game }) {

    const genres = game.genres.map((genre) => genre.name).join(', ');

    return (
        <article key={game.id}>
            <img src={game.background_image} alt={game.name} />
            <h2>{game.name}</h2>
            <small>{genres}</small>
            <p>{game.released}</p>
            <button>Visita il gioco</button>
        </article>
    );
}