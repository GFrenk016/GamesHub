import GenresDropdown from './GenresDropdown';
import { Link } from 'react-router-dom';

export default function Header() {
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
                    <li><Link to="/search" className="hover:text-gray-400 transition mx-4">Cerca</Link></li>
                    <li><Link to="/profile" className="hover:text-gray-400 transition mx-4">Profilo</Link></li>
                </ul>
            </div>

        </div>
    </nav>
    );
}
