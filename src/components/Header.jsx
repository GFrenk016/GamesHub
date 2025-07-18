import GenresDropdown from './GenresDropdown';
import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/supabase-client';
import { useEffect, useState } from 'react';

export default function Header() {
    const [session, setSession] = useState(null);

    const getSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) setSession(null);
        console.log(data);
        setSession(data);
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        alert ("Logout effettuato con successo");
        getSession();
    };

    useEffect(() => {
        getSession();
    }, []);

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
                    {!session ? (
                        <>
                            <li className="hover:text-gray-400 transition mx-4">
                                <details className="dropdown">
                                    <summary>Account</summary>
                                    <ul dir='rtl'>
                                        <li><a href="#"> Impostazioni</a></li>
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
