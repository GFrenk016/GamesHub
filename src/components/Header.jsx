import { useContext } from 'react';
import GenresDropdown from './GenresDropdown';
import Searchbar from './Searchbar';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase-client';
import SessionContext from '../context/SessionContext';

export default function Header() {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        alert ("Logout effettuato con successo");
        navigate("/");
    };

    return (
    <nav className="bg-gray-900 text-white shadow custom fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

            <Link to="/" className="text-lg font-semibold tracking-wide hover:text-gray-300 transition">
            Gaming Hub
            </Link>

            <div className="space-x-6">
                <ul className="flex">
                    <li className="hover:text-gray-400 transition mx-4"><GenresDropdown /></li>
                    <li><Link to="/" className="hover:text-gray-400 transition mx-4">Home</Link></li>
                    <li><Link to="/games" className="hover:text-gray-400 transition mx-4">Giochi</Link></li>
                    {session ? (
                        <>
                            <li className="hover:text-gray-400 transition mx-4">
                                <details className="dropdown">
                                    <summary>{session?.user.user_metadata.username}</summary>
                                    <ul dir='rtl'>
                                        <li><Link to="/account" className="hover:text-gray-400 transition mx-4">Profilo </Link></li>
                                        <li><button onClick={signOut}>Logout</button></li>
                                    </ul>
                                </details>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="hover:text-gray-400 transition mx-4">Accedi</Link></li>
                            <li><Link to="/register" className="hover:text-gray-400 transition mx-4">Registrati</Link></li>
                        </>
                    )}
                    <li className="hover:text-gray-400 transition mx-4"><Searchbar /></li>
                </ul>
            </div>

        </div>
    </nav>
    );
}
