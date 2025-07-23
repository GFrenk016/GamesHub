import { Link } from 'react-router';
import LazyLoadGameImage from "./LazyLoadGameImage";

export default function CardGame({ game }) {

    const genres = game.genres.map((genre) => genre.name).join(' - ');

    const { background_image:  image } = game;

    return (
        <div className="card" key={game.id}>
            <LazyLoadGameImage image= {image} />
            <div className="flex flex-col gap-2 mt-5">
                <h2 className="font-bold text-2xl text-white">{game.name}</h2>
                <p className="text-lg">{genres}</p>
                <div className="flex justify-between mt-2">
                    <p className="text-base">Rating: {game.rating}</p>
                    <p className="text-base">Data di uscita: {game.released}</p>
                </div>
                <span className="flex justify-end">
                    <Link to={`/games/${game.slug}/${game.id}`}>
                    <button className="bg-gray-500 hover:bg-gray-700 transition text-white py-2 px-4 rounded mt-2 cursor-pointer text-base">Scopri di più</button>
                    </Link>
                </span>
            </div>
        </div>
    );
}