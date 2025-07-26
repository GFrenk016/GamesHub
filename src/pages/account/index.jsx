import { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";
import Avatar from "../../components/Avatar";
import { Link } from "react-router";

export default function AccountPage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    
    useEffect(() => {
        let ignore = false;
        const getProfile = async () => {
            setLoading(true);
            const { user } = session

            const { data, error } = await supabase
                .from("profiles")
                .select(`username, first_name, last_name, avatar_url`)
                .eq("id", user.id)
                .single();
            
            if (!ignore) {
                if (error) {
                    console.warn(error)
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
            }

            setLoading(false);
        }

        getProfile();

        return () => {
            ignore = true;
        }
    }, [session]);

    const updateProfile = async (event, avatarUrl) => {
        event.preventDefault();
        
        setLoading(true);
        const { user } = session;
        
        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);
        if (error) {
            alert(error.message);
        } else {
            alert("Profilo aggiornato con successo!");
            setAvatarUrl(avatarUrl);
        }
        setLoading(false);
    }

    if (!session || !session.user) {
        return (
            <div className="text-white text-center mt-10">
                Loading...
            </div>
        );
    }

    return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <form onSubmit={updateProfile} className="bg-gray-900 p-6 rounded-md shadow-md space-y-6">
                    <h2 className="text-xl font-semibold text-white">Il tuo profilo</h2>
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar
                            url={avatar_url}
                            size={150}
                            onUpload={(event, url) => updateProfile(event, url)}
                        />
                    </div>

                    <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-white font-medium mb-1">Email</label>
                        <input
                        id="email"
                        type="text"
                        value={session.user.email}
                        disabled
                        className="w-full px-4 py-2  text-white rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-white font-medium mb-1">Username</label>
                        <input
                        id="username"
                        type="text"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2  text-white rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="first_name" className="block text-white font-medium mb-1">Nome</label>
                        <input
                        id="first_name"
                        type="text"
                        value={first_name || ""}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2  text-white rounded-md"
                        />
                    </div>

                    <div>
                        <label htmlFor="last_name" className="block text-white font-medium mb-1">Cognome</label>
                        <input
                        id="last_name"
                        type="text"
                        value={last_name || ""}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2  text-white rounded-md"
                        />
                    </div>
                    </div>

                    <div className="text-right">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gray-500 hover:bg-gray-700 transition text-white py-2 px-4 rounded mt-2 cursor-pointer text-base"
                    >
                        {loading ? "Loading..." : "Aggiorna"}
                    </button>
                    </div>
                </form>

                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-white mb-4">🎮 I tuoi giochi preferiti</h2>
                    {favorites.length === 0 ? (
                    <p className="text-gray-300">Non hai ancora aggiunto giochi preferiti.</p>
                    ) : (
                    <ul className="space-y-4">
                        {favorites.map((game) => (
                        <li
                            key={game.game_id}
                            className="flex items-center justify-between bg-gray-700 px-4 py-3 rounded-md shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                            <img
                                width={50}
                                height={50}
                                src={game.game_image}
                                alt={game.game_name}
                                className="rounded-md"
                            />
                            <Link to={`/games/${game.game_slug}/${game.game_id}`}>
                            <p className="text-white font-medium">{game.game_name}</p>
                            </Link>
                            </div>
                            <button
                            className="text-red-500 hover:text-red-600 transition"
                            onClick={() => removeFavorite(game.game_id)}
                            >
                            <FaTrashAlt />
                            </button>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
    );

}