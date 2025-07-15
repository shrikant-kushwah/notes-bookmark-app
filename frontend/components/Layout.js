import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { FiBookOpen } from 'react-icons/fi';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div
      className="min-h-screen flex flex-col text-slate-100"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #9333ea 100%)',
      }}
    >
      <header className="bg-blue-950 sticky top-0 z-20 shadow border-b border-blue-900">
        <div className="max-w-screen mx-auto px-12 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
            <FiBookOpen className="text-blue-400" size={28} />
            Notes & Bookmarks
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/notes" className="hover:text-blue-400 transition">
              Notes
            </Link>
            <Link href="/bookmarks" className="hover:text-blue-400 transition">
              Bookmarks
            </Link>

            {user ? (
              <>
                <span className="text-slate-300 hidden sm:inline">{user.username || user.email}</span>
                <button
                  onClick={logout}
                  className="ml-2 px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition text-white text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-400 transition">
                  Login
                </Link>
                <Link href="/register" className="hover:text-blue-400 transition">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
