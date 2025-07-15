import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../utils/api';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      if (!data.token) throw new Error(data.error || 'Login failed');
      login(data.user, data.token);
      router.push('/notes');
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="card p-8 max-w-md w-full bg-slate-800 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-200">Login</h2>

          {error && (
            <div className="mb-4 bg-red-600 text-white px-4 py-2 rounded text-sm font-medium">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-slate-700 border border-blue-800 text-white placeholder-slate-400 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-slate-700 border border-blue-800 text-white placeholder-slate-400 rounded px-3 py-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="button-gradient w-full disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="mt-4 text-center text-sm text-slate-300">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
