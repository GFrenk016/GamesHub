import { useState, useEffect, useContext, useCallback } from "react";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoritesContext";

export default function FavoritesProvider({ children }) {
    const { session } = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);

    const getFavorites = useCallback(async () => {
        let { data: favourites, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", session?.user.id);
        if (error) {
        console.log(error);
        console.log("Errore in console");
        } else {
        setFavorites(favourites);
        }
    }, [session]);

    const addFavorites = async (game) => {
        const userId = session?.user?.id;

        const { error } = await supabase
            .from("favorites")
            .insert([
            {
                user_id: userId,
                game_id: game.id,
                game_name: game.name,
                game_image: game.background_image,
                game_slug: game.slug,
            },
            ])
            .select();

        if (error) {
            console.error("Errore durante l'inserimento:", error.message);
        }
    };

    const removeFavorite = async (gameId) => {
        await supabase
        .from("favorites")
        .delete()
        .eq("game_id", gameId)
        .eq("user_id", session?.user.id);
    };

    useEffect(() => {
        if (session) {
        getFavorites();
        }

        const favorites = supabase
        .channel("favorites")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "favorites" },
            () => getFavorites()
        )
        .subscribe();

        return () => {
        if (favorites) {
            supabase.removeChannel(favorites);
        }
        favorites.unsubscribe();
        };
    }, [getFavorites, session]);

    return (
        <FavoritesContext.Provider
        value={{
            favorites,
            setFavorites,
            addFavorites,
            removeFavorite,
        }}
        >
        {children}
        </FavoritesContext.Provider>
    );
}
