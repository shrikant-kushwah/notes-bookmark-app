import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="card max-w-lg w-full p-12 text-center flex flex-col items-center shadow-lg">
          <h1 className="text-4xl font-extrabold text-sky-400 mb-4">
            Welcome to Notes & Bookmarks
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Organize your thoughts and favorite links all in one place.
            Simple, secure, and fast.
          </p>

          <div className="w-full flex flex-col gap-4">
            <button
              onClick={() => router.push('/notes')}
              className="button-gradient w-full"
            >
              View Notes
            </button>
            <button
              onClick={() => router.push('/bookmarks')}
              className="button-gradient w-full"
            >
              View Bookmarks
            </button>
            <button
              onClick={() => router.push('/login')}
              className="button-gradient w-full"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/register')}
              className="button-gradient w-full"
            >
              Register
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
