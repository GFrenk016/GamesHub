import { useEffect } from 'react';
import useFetchSolution from '../../hook/useFetchSolution';
import CardGame from '../../components/Card';

export default function Homepage() {
    const initialUrl = 'https://api.rawg.io/api/games?key=a15a7b3ac6b541bdaf2e36ad79c7aeb4&dates=2024-01-01,2024-12-31&page=1'

    const { data, error, loading, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <div className='container mx-auto text-center mt-8'>
            <h1 className='text-2xl font-bold mb-8'>Benvenuto nella homepage!</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
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
