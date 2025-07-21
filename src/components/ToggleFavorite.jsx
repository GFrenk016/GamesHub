import { useContext, useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import SessionContext from "../context/SessionContext";
import { supabase } from "../supabase/supabase-client";

export default function ToggleFavorite({ data }) {
  const { session } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      const { data: favs, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Errore nel recupero dei preferiti:", error.message);
      } else {
        setFavorites(favs || []);
      }
    };

    fetchFavorites();
  }, [userId]);

  const isFavorite = () =>
    favorites.some((el) => +el.game_id === +data?.id);

  const addFavorite = async () => {
    if (!data?.id || !userId) return;
    setLoading(true);

    const favoriteData = {
      user_id: userId,
      game_id: data.id,
      game_name: data.name,
      game_image: data.background_image,
    };

    console.log("Tentativo di inserimento:", favoriteData);

    const { data: inserted, error } = await supabase
      .from("favorites")
      .insert([favoriteData])
      .select();

    if (error) {
      console.error("❌ Errore inserimento:", error.message);
    } else if (inserted?.length > 0) {
      setFavorites((prev) => [...prev, ...inserted]);
      console.log("✅ Inserito con successo:", inserted);
    }

    setLoading(false);
  };

  const removeFavorite = async () => {
    if (!data?.id || !userId) return;
    setLoading(true);

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("game_id", data.id)
      .eq("user_id", userId);

    if (error) {
      console.error("❌ Errore rimozione:", error.message);
    } else {
      setFavorites((prev) =>
        prev.filter((el) => +el.game_id !== +data.id)
      );
      console.log("🗑 Rimosso con successo");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-2">
      {userId ? (
        isFavorite() ? (
          <button
            onClick={removeFavorite}
            aria-label="Rimuovi dai preferiti"
            className={`btn-fav-cyber active ${loading ? "disabled" : ""}`}
            disabled={loading}
          >
            <FaHeart />
          </button>
        ) : (
          <button
            onClick={addFavorite}
            aria-label="Aggiungi ai preferiti"
            className={`btn-fav-cyber ${loading ? "disabled" : ""}`}
            disabled={loading}
          >
            <FaRegHeart />
          </button>
        )
      ) : (
        <span className="text-muted small text-center">
          Accedi per aggiungere ai preferiti
        </span>
      )}
    </div>
  );
}
