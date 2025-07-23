import { useContext, useState, useEffect, useRef } from 'react';
import GenresDropdown from './GenresDropdown';
import Searchbar from './Searchbar';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase-client';
import SessionContext from '../context/SessionContext';
import guestImg from '../assets/guest-img.png';

export default function Header() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { session } = useContext(SessionContext);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const avatarPath = session?.user.user_metadata.avatar;
    const dropdownRef = useRef(null);

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path);
            if (error) throw error;
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
            } catch (error) {
                console.log('Error downloading image: ', error.message);
            }
        }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        alert ("Logout effettuato con successo");
        navigate("/");
    };

    useEffect(() => {
        if (avatarPath) downloadImage(avatarPath);
    }, [avatarPath]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
    <nav className="bg-gray-900 shadow custom fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

            <Link to="/" className="text-lg font-semibold tracking-wide hover:text-gray-300 transition">
            Gaming Hub
            </Link>

            <div className="space-x-6">
                <ul className="flex items-center">
                    <li className="hover:text-gray-400 transition mx-4"><GenresDropdown /></li>
                    <li><Link to="/" className="hover:text-gray-400 transition mx-4">Home</Link></li>
                    <li><Link to="/games" className="hover:text-gray-400 transition mx-4">Giochi</Link></li>
                    {session ? (
                        <>
                            <li ref={dropdownRef} className="dropdown-container mx-4 relative">
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <img
                                        src={avatarUrl || guestImg}
                                        alt=""
                                        className="rounded-full"
                                        style={{ width: '32px', height: '32px', boxShadow: '0 0 5px black' }}
                                    />
                                    <span className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                                        {session?.user.user_metadata.username}
                                    </span>
                                    <ul className={`dropdown-menu absolute right-0 top-full mt-2 ${isOpen ? 'show' : ''}`} dir='rtl'>
                                        <li>
                                            <Link to="/account" className="dropdown-item">Profilo </Link>
                                        </li>
                                        <li>
                                            <a className="dropdown-item cursor-pointer !text-red-500" onClick={signOut}>Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="hover:text-gray-400 transition mx-4">Accedi</Link></li>
                            <li><Link to="/register" className="hover:text-gray-400 transition mx-4">Registrati</Link></li>
                        </>
                    )}
                    <li className="mx-4"><Searchbar /></li>
                </ul>
            </div>

        </div>
    </nav>
    );
}
