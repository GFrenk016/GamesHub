
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-400">&copy; 2025 Gaming Hub. Tutti i diritti riservati.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a
            href="https://github.com/tuo-profilo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            GitHub
          </a>
          <a
            href="/privacy"
            className="hover:text-gray-300 transition"
          >
            Privacy
          </a>
          <a
            href="/contatti"
            className="hover:text-gray-300 transition"
          >
            Contatti
          </a>
        </div>
      </div>
    </footer>
  );
}
