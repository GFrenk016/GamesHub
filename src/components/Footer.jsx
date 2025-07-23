import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between custom">
        <p className="text-sm text-gray-400">&copy; 2025 Gaming Hub. Tutti i diritti riservati.</p>
        <div className="space-x-4 mt-2 md:mt-0 flex">
          <a
            href="https://github.com/GFrenk016"
            target="_blank"
            className="hover:text-gray-300 transition"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/francesco-guccione-developer/"
            target="_blank"
            className="hover:text-gray-300 transition"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
