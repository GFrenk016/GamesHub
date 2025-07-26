import { useEffect } from "react";
import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";

export default function GamePage() {
    const { id } = useParams();

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=a15a7b3ac6b541bdaf2e36ad79c7aeb4`;
    

    const { data, error, loading, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <>
            {error && <h1 className="text-red-500 text-center mb-4">{error}</h1>}
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                <span className="flex justify-end">
                    <ToggleFavorite data={data} />
                </span>
                <div className="bg-gray-900 p-6 rounded-md shadow-md space-y-4">
                    <p className="text-sm text-gray-400">Data di rilascio: {data?.released}</p>
                    <h1 className="text-3xl font-bold text-white">{data?.name}</h1>
                    <p className="text-white text-lg">⭐ Rating: {data?.rating}</p>
                </div>
                <div className="rounded-md overflow-hidden shadow-lg">
                    {loading ? (
                    <p className="text-white text-center">Loading...</p>
                    ) : (
                    <img
                        src={data?.background_image}
                        alt={data?.name}
                        className="w-full h-[400px] object-cover object-center"
                    />
                    )}
                    {error && <p className="text-red-500 text-center mt-2">Errore: {error}</p>}
                </div>
                <div className="bg-gray-900 p-6 rounded-md shadow-sm">
                    <h2 className="text-xl font-semibold text-white mb-2">Descrizione</h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {data?.description_raw}
                    </p>
                </div>
                <div className="mt-8">
                    <div className="bg-gray-800 rounded-md p-4 shadow-sm">
                        <Chatbox data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}