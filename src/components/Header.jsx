
import { Link } from 'react-router-dom';

export default function Header() {
    return (
    <nav className="bg-gray-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

            <Link to="/" className="text-lg font-semibold tracking-wide hover:text-gray-300 transition">
            Gaming Hub
            </Link>

            <div className="space-x-6">
            <Link to="/" className="hover:text-gray-400 transition">Home</Link>
            <Link to="/games" className="hover:text-gray-400 transition">Giochi</Link>
            <Link to="/search" className="hover:text-gray-400 transition">Cerca</Link>
            <Link to="/profile" className="hover:text-gray-400 transition">Profilo</Link>
            </div>
        </div>
    </nav>
    );
}
