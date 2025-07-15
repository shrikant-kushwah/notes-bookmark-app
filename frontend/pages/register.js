import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../utils/api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Register() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await registerUser(form);
      if (!data.token) throw new Error(data.error || 'Registration failed');
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
          className="card w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-200">Create an Account</h2>

          {error && (
            <div className="bg-red-600 text-white text-sm font-medium px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="bg-slate-700 border border-green-700 text-white placeholder-slate-400 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-slate-700 border border-green-700 text-white placeholder-slate-400 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="bg-slate-700 border border-green-700 text-white placeholder-slate-400 rounded px-3 py-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="button-gradient w-full disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div className="mt-4 text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-400 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
